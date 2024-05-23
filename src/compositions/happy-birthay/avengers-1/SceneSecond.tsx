import { useMemo } from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const disappearBeforeEnd = 20;

const SceneSecond: React.FC<{ message: string }> = ({ message }) => {

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      mass: 0.5,
    },
  });

  const out = spring({
    // fps,
    fps: fps,
    // frame: frame - durationInFrames + disappearBeforeEnd,
    frame: frame - durationInFrames,
    // frame: frame - 135,
    config: {
      damping: 200,
    },
    durationInFrames: disappearBeforeEnd,
  });

  const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
  // const outY = interpolate(out, [0, 1], [0, -500]);
  const outY = interpolate(out, [0, 1], [0, -1000]);

  const container: React.CSSProperties = useMemo(() => {
    return {
      position: 'relative',
      // backgroundColor: 'yellow',
      // borderRadius: 25,
      // right: 90,
      top: 300,
      margin: '0 auto',
      scale: String(scale),
      translate: `0 ${outY}px`,
      rotate: `${rotate}rad`,
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      padding: 40,
    };
  }, [scale, outY, rotate]);

  const text: React.CSSProperties = {
    fontWeight: 'bold',
    fontFamily: "Jungle",
    fontSize: 60,
    color: '#FF0001',
    textShadow: '5px 0 white, -5px 0 white, 0 5px white, 0 -5px white, 5px 5px white, -5px -5px white, 5px -5px white, -5px 5px white',
    // backgroundColor: 'red',
    textAlign: 'center',
  };

  return (
    <div style={container}>
      <div style={text}>{message}</div>      
    </div>
  );
};

export default SceneSecond;
