import {
  AbsoluteFill,
  Sequence
} from 'remotion';
import React from 'react';
// import Album from '../components/Album';
import { Clip } from '../../../components/Clip';
import Message1 from './Message1';

export const Production: React.FC<{
  // secondaryColor: string;
  // audio: string;
  // album: string;
  // movie: string;
  m_title: string;
  m_text_1: string;
  m_text_2: string;
}> = ({ /*secondaryColor, album, */m_title, m_text_1, m_text_2 }) => {

  return (
    <AbsoluteFill>
      <Clip />
      <Sequence from={0} durationInFrames={135}>
        <Message1 m_title={m_title} m_text_1={m_text_1} m_text_2={m_text_2} />
      </Sequence>
      <Sequence from={135} durationInFrames={105}>
        <Message1 m_title={m_title} m_text_1={"Vamos a vivir una"} m_text_2={"fiesta increíble!"} />
      </Sequence>
      <Sequence from={310} durationInFrames={110}>
        <Message1 m_title={m_title} m_text_1={"En el cumpleaños"} m_text_2={"de Sergio Alón"} />
      </Sequence>
      <Sequence from={500} durationInFrames={154}>
        <Message1 m_title={m_title} m_text_1={"Te esperamos el sábado"} m_text_2={"05 de febrero desde las 4:00pm"} />
      </Sequence>
      {/* <Sequence from={654} durationInFrames={200}>
        <Album album={album} backgroundColor={secondaryColor} />
      </Sequence> */}
    </AbsoluteFill>
  );
};
