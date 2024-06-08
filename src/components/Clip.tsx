import React from 'react';
import {
  interpolate,
  // OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
  Audio,
} from 'remotion';
// import clip from '../assets/happy-birthay/bob-esponja-1/video/clip.mp4';

//const MessageFirst: React.FC<{ message: string }> = ({ message }) => {
export const Clip: React.FC<{ source: any }> = ({ source }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0]
  );
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 400,
      mass: 2,
    },
  });
  return (
    <div
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {/* <OffthreadVideo
        src={source}
      // style={{width: '90%', opacity, transform: `scale(${scale})`}}
      /> */}
      {/* <Video src={staticFile("/videos/flipbook.mov")} /> */}
      {/* <Audio src={staticFile("audio.mp3")} /> */}
      <Video src={staticFile("/videos/happy-birthay/jungle-1/video/clip.mp4")} />
      {/* <OffthreadVideo src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> */}
    </div>
  );
};
