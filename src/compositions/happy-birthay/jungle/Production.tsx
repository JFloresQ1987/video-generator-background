import {
  AbsoluteFill,
  Sequence,
  continueRender,
  delayRender,
  staticFile
} from 'remotion';
import React from 'react';
import { Clip } from '../../../components/Clip';
import MessageFirst from './MessageFirst';
import clip from '../../../assets/happy-birthay/jungle/video/clip.mp4';

const waitForFont = delayRender();
const font = new FontFace(
  'Jungle',
  `url('${staticFile("/fonts/jungle.ttf")}') format('truetype')`,
);

font
  .load()
  .then(() => {
    document.fonts.add(font);
    continueRender(waitForFont);
  })
  .catch((err) => console.log("Error loading font", err));

const Production: React.FC<{
  first_message: string;
}> = ({ first_message }) => {

  return (
    <AbsoluteFill>
      <Clip source={clip} />
      <Sequence from={0} durationInFrames={155}>
        <MessageFirst message={first_message} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Production;
