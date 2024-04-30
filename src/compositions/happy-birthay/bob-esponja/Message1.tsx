// import { loadFont } from '@remotion/google-fonts/Roboto';
import { useMemo } from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// import { continueRender, delayRender, staticFile } from "remotion";

// // import clip from './font.woff2';

// const waitForFont = delayRender();
// const font = new FontFace(
//   // `BobEsponja`,
//   'BobEsponja',
//   `url('${staticFile("/fonts/bob-esponja.ttf")}') format('truetype')`,
// );

// font
//   .load()
//   .then(() => {
//     document.fonts.add(font);
//     continueRender(waitForFont);
//   })
//   .catch((err) => console.log("Error loading font", err));

// // const { fontFamily } = loadFont();

const title: React.CSSProperties = {
  // fontFamily,
  fontFamily: "BobEsponja",
  fontSize: 80,
  fontWeight: 'bold',
  color: 'red',
};

const text: React.CSSProperties = {
  fontWeight: 'bold',
  // fontFamily,
  fontFamily: "BobEsponja",
  fontSize: 50,
  color: '#4290F5',
};

const disappearBeforeEnd = 20;

const Message1: React.FC<{ m_title: string, m_text_1: string, m_text_2: string }> = ({ m_title, m_text_1, m_text_2 }) => {

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      // mass: 0.5,
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
      position: 'absolute',
      backgroundColor: 'yellow',
      borderRadius: 25,
      // right: 90,
      // top: 90,
      right: 100,
      top: 80,
      scale: String(scale),
      translate: `0 ${outY}px`,
      rotate: `${rotate}rad`,
      padding: 40,
    };
  }, [scale, outY, rotate]);

  return (
    <div style={container}>
      {/* <div style={title}>{m_title}</div> */}
      <div style={text}>{m_text_1}</div>
      <div style={text}>{m_text_2}</div>
    </div>
  );
};

export default Message1;
