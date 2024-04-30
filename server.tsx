import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import express from "express";
import path from "path";
import { supabaseAdmin } from "./src/libs/supabase";

const app = express();
const video_publico = express.static(__dirname + '/public');
const port = 8000;

const newProduction = async (payload: any) => {
  console.log('video request to render!');
  const data = payload.new;
  await renderVideo(data);
}

const renderVideo = async (_inputProps: any) => {

  try {

    const compositionId = "Production";
    const videoName = `${(new Date()).getTime()}`;
    const bundleLocation = await bundle({
      entryPoint: path.resolve("./src/index.ts"),
      webpackOverride: (config) => config,
    });
    const { data, error } = await supabaseAdmin
      .storage
      .from('test-bucket')
      .createSignedUrl(_inputProps.image, 3000)

    if (error) console.error(error);
    if (data) {

      const inputProps = _inputProps;
      inputProps.album = data?.signedUrl;

      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps,
      });

      console.log('rendering video!');
      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation: `public/videos/${videoName}.mp4`,
        inputProps,
      });

      const _path = `http:/localhost:8000/videos/${videoName}.mp4`;
      updateProduction(_inputProps.id, _path, inputProps.album);
      console.log('video rendered!');
    }
  } catch (err) {
    console.error(err);
  }
};

const updateProduction = async (_id: any, _path: any, _album: any) => {

  const { data, error } = await supabaseAdmin
    .from('production')
    .upsert({
      id: _id,
      state: 1,
      path: _path,
      album: _album
    })

  if (error) console.log(error)
  if (data) console.log(data)
};

app.listen(port);
app.use(video_publico);

console.log(
  [
    `The server has started on http://localhost:${port}!`,
    'You can render a video by passing props as URL parameters.',
    '',
  ].join('\n')
);

supabaseAdmin
  .channel('todos')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'production' }, newProduction)
  .subscribe()