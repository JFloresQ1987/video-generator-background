import { useMemo } from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Animated, Fade, Move, Rotate, Scale, Size } from 'remotion-animated';

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

  // const container: React.CSSProperties = useMemo(() => {
  //   return {
  //     position: 'relative',
  //     // backgroundColor: 'yellow',
  //     // borderRadius: 25,
  //     // right: 90,
  //     top: 300,
  //     margin: '0 auto',
  //     scale: String(scale),
  //     translate: `0 ${outY}px`,
  //     rotate: `${rotate}rad`,
  //     // display: 'flex',
  //     // justifyContent: 'center',
  //     // alignItems: 'center',
  //     padding: 40,
  //   };
  // }, [scale, outY, rotate]);

  const container: React.CSSProperties = {
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

  const text: React.CSSProperties = {
    fontWeight: 'bold',
    fontFamily: "MickeyMouse",
    fontSize: 60,
    color: '#FF0001',
    textShadow: '5px 0 white, -5px 0 white, 0 5px white, 0 -5px white, 5px 5px white, -5px -5px white, 5px -5px white, -5px 5px white',
    // backgroundColor: 'red',
    textAlign: 'center',
  };

  return (
    // <div style={container}>


    <Animated
      animations={[
        Scale({ by: 1.5, initial: 10, mass: 2, stiffness: 300, duration: 40 }),
        // Move({ y: -40, start: 50 }),
        // Move({ y: 40, start: 100 }),
        // Fade({ to: 0, start: 150 }),
        // Scale({ by: 0, start: 150, mass: 75 }),
      ]}
    // animations={[Size({ width: 300 })]}
    // animations={[
    //   Fade({ to: 1, initial: 0, start: 20 }),
    //   Fade({ to: 0, start: 60 }),
    // ]}
    // animations={[Rotate({ degrees: 360 })]}
    // animations={[Scale({ by: 1.5 })]}
    // animations={[
    //   Move({ x: 20, y: 80 }),
    //   Move({ x: 20, y: -80, start: 20 }),
    //   Move({ x: 40, start: 40 }),
    // ]}
    >
      <div style={container}>
        <div style={text}>{message}</div>
      </div>
    </Animated>
  );
};

export default SceneSecond;
