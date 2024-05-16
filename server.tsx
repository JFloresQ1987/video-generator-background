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

const handleChanges = async (payload: any) => {

  const data = payload.new;

  if (payload.eventType == 'INSERT')
    newOrder(data);
  else if (payload.eventType == 'UPDATE')
    editOrder(data);
}

const newOrder = async (data: any) => {

  //TODO: validar el usuario quien creo la inserción
  console.log(`1. video request to render! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
  await renderVideo(data, true);
}

const editOrder = async (data: any) => {

  //TODO: validar el usuario quien creo la inserción
  if (data.order_state == 'edited') {
    console.log(`1. video request edited to render! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
    await renderVideo(data, false);
  }
}

const renderVideo = async (_inputProps: any, _isNew: boolean) => {

  try {

    const messages = _inputProps?.messages;
    const images = _inputProps?.images;
    //TODO: ajustar tiempo de expiración expiresIn
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
    }

    // const videoName = `${(new Date()).getTime()}`;
    const bundleLocation = await bundle({
      // entryPoint: path.resolve("./src/index.ts"),
      entryPoint: path.resolve(getCompositionPath(_inputProps?.model_composition)),
      webpackOverride: (config) => config,
    });

    // const with_watermark = true;
    // const inputProps = Object.assign(with_watermark, messages, images);
    // const composition = await selectComposition({
    //   serveUrl: bundleLocation,
    //   id: "Production",
    //   inputProps,
    // });

    if (_isNew) {
      const numberRandom = Math.floor(Math.random() * 100000);
      const videoName = `${(new Date()).getTime()}${numberRandom}`;

      console.log(`2. rendering video with watermark! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
      await customRenderMedia(bundleLocation, messages, images, videoName, true);

      console.log(`3. video rendered with watermark! [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
      //TODO: cambiar localhost
      // const _url = `http:/localhost:${process.env.PORT}/videos/${videoName}.mp4`;
      await updateOrderWithWatermark(_inputProps.id, images, videoName);
    }

    const numberRandom = Math.floor(Math.random() * 100000);
    const videoName = `${(new Date()).getTime()}${numberRandom}`;

    console.log(`5. rendering video! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
    await customRenderMedia(bundleLocation, messages, images, videoName, false);

    console.log(`6. video rendered! [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
    //TODO: cambiar localhost
    // const _url = `http:/localhost:${process.env.PORT}/videos/${videoName}.mp4`;
    await updateOrder(_inputProps.id, images, videoName);

    // await renderMedia({
    //   composition,
    //   serveUrl: bundleLocation,
    //   codec: "h264",
    //   outputLocation: `public/videos/${videoName}.mp4`,
    //   // inputProps,
    // });

    // console.log(`3. video rendered! [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
    // //TODO: cambiar localhost
    // const _url = `http:/localhost:${process.env.PORT}/videos/${videoName}.mp4`;
    // updateProduction(_inputProps.id, images, _url);

  } catch (err) {
    console.error(err);
  }
};

const customRenderMedia = async (bundleLocation: any, messages: any, images: any, videoName: string, with_watermark: boolean) => {

  // console.log('entro a renderizar')
  // console.log(videoName)  

  const prop_with_watermark = {
    with_watermark: with_watermark
  }
  const inputProps = Object.assign(prop_with_watermark, messages, images);

  // console.log(inputProps)

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "Production",
    inputProps,
  });

  // console.log(`2. rendering video with watermark! ... [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: `public/videos/${videoName}.mp4`,
    // inputProps,
  });
};

const updateOrderWithWatermark = async (_id: string, _images: string, _videoName: string) => {

  //status: 204
  const url = `http:/localhost:${process.env.PORT}/videos/${_videoName}.mp4`;
  const { error } = await supabaseAdmin
    .from('orders')
    .update({
      order_state: 'produced',
      images: _images,
      // video_rendered_url: _url,
      video_rendered_url_with_watermark: url,
    })
    .eq('id', _id)

  console.log(`4. video order with watermark update! [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);

  if (error) console.log(error)
};

const updateOrder = async (_id: string, _images: string, _videoName: string) => {

  //status: 204
  const url = `http:/localhost:${process.env.PORT}/videos/${_videoName}.mp4`;

  const { data/*, error*/ } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', _id)
    .single()

  const new_payment_attempt_number = (data.payment_attempt_number || 0) - 1;

  const { error } = await supabaseAdmin
    .from('orders')
    .update({
      order_state: 'produced',
      // images: _images,
      payment_attempt_number: new_payment_attempt_number,
      video_rendered_url: url,
      // video_rendered_url_with_watermark: _url,
    })
    .eq('id', _id)

  console.log(`7. video order update! [${moment().format('DD/MM/YYYY hh:mm:ss')}]`);

  if (error) console.log(error)
};

app.listen(process.env.PORT);
app.use(video_publico);

console.log(
  [
    `Server running on port ${process.env.PORT}!`,
    '',
  ].join('\n')
);

supabaseAdmin
  .channel('todos')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, handleChanges)
  .subscribe()