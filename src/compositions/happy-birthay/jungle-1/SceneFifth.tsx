import { useMemo } from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const disappearBeforeEnd = 20;

const SceneFifth: React.FC<{ message: string }> = ({ message }) => {

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
    fps: fps,    
    frame: frame - durationInFrames,    
    config: {
      damping: 200,
    },
    durationInFrames: disappearBeforeEnd,
  });

  const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);  
  const outY = interpolate(out, [0, 1], [0, -1000]);

  const container: React.CSSProperties = useMemo(() => {
    return {
      position: 'relative',
      // backgroundColor: 'yellow',
      top: 390,
      // left: 0,
      width: '50%',
      margin: '0',
      scale: String(scale),
      translate: `0 ${outY}px`,
      rotate: `${rotate}rad`,
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      padding: 0,
    };
  }, [scale, outY, rotate]);

  const text: React.CSSProperties = {
    fontWeight: 'bold',
    fontFamily: "Jungle2",
    fontSize: 35,
    // color: '#FF7000',
    color: '#FF0000',
    textShadow: '2.5px 0 #FFFFFF, -2.5px 0 #FFFFFF, 0 2.5px #FFFFFF, 0 -2.5px #FFFFFF, 2.5px 2.5px #FFFFFF, -2.5px -2.5px #FFFFFF, 2.5px -2.5px #FFFFFF, -2.5px 2.5px #FFFFFF',
    // backgroundColor: 'red',
    textAlign: 'center',
  };

  return (
    <div style={container}>
      <div style={text}>{message}</div>
    </div>
  );
};

export default SceneFifth;
