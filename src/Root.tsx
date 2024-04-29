import { Composition } from 'remotion';
import { Production } from './compositions/happy-birthay/bob-esponja/Production';
import { config } from "./config";
// import audio from "./assets/audio/audio.mp3";
// import album from "./assets/images/foto1.jpg";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Production"
        component={Production}
        durationInFrames={config.durationInFrames}
        fps={config.fps}
        // width={1920}
        // height={1080}
        // width={640}
        // height={320}
        width={720}
        height={1428}
        defaultProps={{
          // primaryColor: config.primaryColor,
          // secondaryColor: config.secondaryColor,
          // audio,
          // album: album,
          // song: config.song,
          // artist: config.artist,
          // movie: config.movie,
          m_title: config.m_title,
          m_text_1: config.m_text_1,
          m_text_2: config.m_text_2,
        }}
      />
    </>
  );
};
