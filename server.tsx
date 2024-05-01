import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { supabaseAdmin } from "./src/libs/supabase";
import { getCompositionPath } from "./src/enums";
import express from "express";
import path from "path";
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

const app = express();
const video_publico = express.static(__dirname + '/public');

const newOrder = async (payload: any) => {
  console.log(`1. video request to render! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
  const data = payload.new;
  await renderVideo(data);
}

const renderVideo = async (_inputProps: any) => {

  try {

    const inputProps = _inputProps;
    const images = inputProps?.images;
    const expiresIn = 3000;

    if (images) {

      if (images?.first_image) {
        const { data, error } = await supabaseAdmin
          .storage
          .from('images')
          .createSignedUrl(images?.first_image, expiresIn)

        if (error) console.error(error);
        if (data) images.first_image_url = data?.signedUrl;
      }
      if (images?.second_image) {
        const { data, error } = await supabaseAdmin
          .storage
          .from('images')
          .createSignedUrl(images?.second_image, expiresIn)

        if (error) console.error(error);
        if (data) images.second_image_url = data?.signedUrl;
      }
      if (images?.third_image) {
        const { data, error } = await supabaseAdmin
          .storage
          .from('images')
          .createSignedUrl(images?.third_image, expiresIn)

        if (error) console.error(error);
        if (data) images.third_image_url = data?.signedUrl;
      }
      if (images?.fourth_image) {
        const { data, error } = await supabaseAdmin
          .storage
          .from('images')
          .createSignedUrl(images?.fourth_image, expiresIn)

        if (error) console.error(error);
        if (data) images.fourth_image_url = data?.signedUrl;
      }
      if (images?.fifth_image) {
        const { data, error } = await supabaseAdmin
          .storage
          .from('images')
          .createSignedUrl(images?.fifth_image, expiresIn)

        if (error) console.error(error);
        if (data) images.fifth_image_url = data?.signedUrl;
      }

      inputProps.images = images;
    }

    // console.log(inputProps);

    // const { data, error } = await supabaseAdmin
    //   .storage
    //   .from('images')
    //   .createSignedUrl(_inputProps.image, 3000)

    // if (error) console.error(error);
    // if (data) {

    //TODO: inputProps?.product_composition validar null

    const videoName = `${(new Date()).getTime()}`;
    const bundleLocation = await bundle({
      // entryPoint: path.resolve("./src/index.ts"),
      entryPoint: path.resolve(getCompositionPath(inputProps?.product_composition)),
      webpackOverride: (config) => config,
    });
    // const inputProps = _inputProps;

    //TODO: validar imagenes para video
    // inputProps.album = data?.signedUrl;

    const messages22 = inputProps.messages
    const images22 = inputProps.images
    // const inputProps22 = { ...messages22, images22 }
    const inputProps22 = Object.assign(messages22, images22);

    // console.log(inputProps22)

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "Production",
      // inputProps: inputProps.messages,
      inputProps: inputProps22,
    });

    console.log(`2. rendering video! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: `public/videos/${videoName}.mp4`,
      inputProps,
    });

    //TODO: cambiar localhost
    // const _path = `http:/localhost:${process.env.PORT}/videos/${videoName}.mp4`;
    // updateProduction(_inputProps.id, _path, inputProps.album);
    console.log(`3. video rendered! [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
    // }
  } catch (err) {
    console.error(err);
  }
};

// const updateProduction = async (_id: string, _path: string, _album: string) => {

//   const { data, error } = await supabaseAdmin
//     .from('orders')
//     .upsert({
//       id: _id,
//       state: 1,
//       path: _path,
//       album: _album
//     })

//   if (error) console.log(error)
//   if (data) console.log(data)
// };

app.listen(process.env.PORT);
app.use(video_publico);

console.log(
  [
    `Server running on port  ${process.env.PORT}!`,
    '',
  ].join('\n')
);

supabaseAdmin
  .channel('todos')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, newOrder)
  .subscribe()