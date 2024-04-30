import React from 'react';
import {
  interpolate,
  OffthreadVideo,
  spring,  
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import clip from '../assets/happy-birthay/bob-esponja/video/clip.mp4';

export const Clip: React.FC = () => {
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
      <OffthreadVideo
        src={clip}
      // style={{width: '90%', opacity, transform: `scale(${scale})`}}
      />
    </div>
  );
};
