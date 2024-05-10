import { Composition } from 'remotion';
// import { Production } from './compositions/happy-birthay/bob-esponja/ProductionBobEsponja';
import { config } from "./config";
// import { Production } from './compositions/Production';
// import { useCallback } from 'react';
// import { Production } from './components/Production';
// import audio from "./assets/audio/audio.mp3";
// import album from "./assets/images/foto1.jpg";

export const RemotionRoot: React.FC = () => {

  // const lazyComponent = useCallback(() => {
  //   // return import("./compositions/happy-birthay/bob-esponja/ProductionBobEsponja");
  //   return import(`./compositions/${config.component}`);    
  // }, []);

  return (
    <>
      <Composition
        id="Production"
        // component={Production}
        lazyComponent={() => import(`./compositions/${config.component}`)}
        durationInFrames={config.durationInFrames}
        fps={config.fps}
        // width={1920}
        // height={1080}
        // width={640}
        // height={320}
        width={720}
        // height={1428}
        height={1280}
        defaultProps={{
          with_watermark: config.with_watermark,
          // primaryColor: config.primaryColor,
          // secondaryColor: config.secondaryColor,
          // audio,
          // album: album,
          // song: config.song,
          // artist: config.artist,
          // movie: config.movie,
          first_message: config.first_message,
          // m_text_1: config.m_text_1,
          // m_text_2: config.m_text_2,
          
        }}
      />
    </>
  );
};
