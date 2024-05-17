import { useMemo } from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const disappearBeforeEnd = 20;

const SceneEnd: React.FC<{ message: string }> = ({ message }) => {

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
      top: 70,
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
    fontFamily: "BobEsponja",
    fontSize: 50,
    color: '#FEDE02',
    textShadow: '4px 0 #2E5094, -4px 0 #2E5094, 0 4px #2E5094, 0 -4px #2E5094, 4px 4px #2E5094, -4px -4px #2E5094, 4px -4px #2E5094, -4px 4px #2E5094',
    // backgroundColor: 'red',
    textAlign: 'center',
  };

  return (
    <div style={container}>
      <div style={text}>{message}</div>
    </div>
  );
};

export default SceneEnd;
