import {
  AbsoluteFill,
  Sequence,
  continueRender,
  delayRender,
  staticFile
} from 'remotion';
import React from 'react';
import { Clip } from '../../../components/Clip';
// import Message1 from './Message1';
import MessageFirst from './MessageFirst';
import clip from '../../../assets/happy-birthay/bob-esponja/video/clip.mp4';
import Watermark from '../../../components/Watermark';

const waitForFont = delayRender();
const font = new FontFace(  
  'BobEsponja',
  `url('${staticFile("/fonts/bob-esponja.ttf")}') format('truetype')`,
);

font
  .load()
  .then(() => {
    document.fonts.add(font);
    continueRender(waitForFont);
  })
  .catch((err) => console.log("Error loading font", err));

// export const ProductionBobEsponja: React.FC<{
const Production: React.FC<{
  // secondaryColor: string;
  // audio: string;
  // album: string;
  // movie: string;
  // m_title: string;
  first_message: string;
  // m_text_2: string;
}> = ({ /*secondaryColor, album, */ first_message /*, m_text_1, m_text_2*/ }) => {

  return (
    <AbsoluteFill>
      <Clip source={clip} />      
      <Sequence from={0} durationInFrames={141}>
        <MessageFirst message={first_message} />
      </Sequence>
      <Sequence from={0} durationInFrames={870}>
        <Watermark/>
      </Sequence>
      {/* <Sequence from={135} durationInFrames={105}>
        <Message1 m_title={m_title} m_text_1={"Vamos a vivir una"} m_text_2={"fiesta increíble!"} />
      </Sequence>
      <Sequence from={310} durationInFrames={110}>
        <Message1 m_title={m_title} m_text_1={"En el cumpleaños"} m_text_2={"de Sergio Alón"} />
      </Sequence>
      <Sequence from={500} durationInFrames={154}>
        <Message1 m_title={m_title} m_text_1={"Te esperamos el sábado"} m_text_2={"05 de febrero desde las 4:00pm"} />
      </Sequence> */}
      {/* <Sequence from={654} durationInFrames={200}>
        <Album album={album} backgroundColor={secondaryColor} />
      </Sequence> */}
    </AbsoluteFill>
  );
};

export default Production;
