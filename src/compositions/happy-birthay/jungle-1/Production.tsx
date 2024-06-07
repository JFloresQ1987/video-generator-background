import {
  AbsoluteFill,
  Sequence,
  continueRender,
  delayRender,
  staticFile
} from 'remotion';
import React from 'react';
import { Clip } from '../../../components/Clip';
import clip from '../../../assets/happy-birthay/jungle-1/video/clip.mp4';
import Watermark from '../../../components/Watermark';
import SceneStart from './SceneStart';
import SceneFirst from './SceneFirst';
import SceneSecond from './SceneSecond';
import SceneThird from './SceneThird';
import SceneFourth from './SceneFourth';
import SceneFifth from './SceneFifth';
import SceneSixth from './SceneSixth';
import SceneSeventh from './SceneSeventh';

const waitForFont = delayRender();
const font = new FontFace(
  'Jungle',
  `url('${staticFile("/fonts/jungle.ttf")}') format('truetype')`,
);
const font_2 = new FontFace(
  'Jungle2',
  `url('${staticFile("/fonts/jungle_2.ttf")}') format('truetype')`,
);

font
  .load()
  .then(() => {
    document.fonts.add(font);
    continueRender(waitForFont);
  })
  .catch((err) => console.log("Error loading font", err));

font_2
  .load()
  .then(() => {
    document.fonts.add(font_2);
    continueRender(waitForFont);
  })
  .catch((err) => console.log("Error loading font", err));

const Production: React.FC<{
  with_watermark: boolean,
  first_message: string;
  second_message: string;
  third_message: string;
  fourth_message: string;
  fifth_message: string;
  sixth_message: string;
  seventh_message: string;
}> = ({ with_watermark,
  first_message,
  second_message,
  third_message,
  fourth_message,
  fifth_message,
  sixth_message,
}) => {

    return (
      <AbsoluteFill>
        {/* <Clip source={clip} /> */}
        <Sequence from={0} durationInFrames={155}>
          <SceneStart message={"TIENES UNA INVITACIÓN"} />
        </Sequence>
        <Sequence from={160} durationInFrames={163}>
          <SceneFirst message={first_message} />
        </Sequence>
        <Sequence from={170} durationInFrames={153}>
          <SceneSecond message={"cumple"} />
        </Sequence>
        <Sequence from={180} durationInFrames={143}>
          <SceneThird message={second_message} />
        </Sequence>
        <Sequence from={190} durationInFrames={133}>
          <SceneFourth message={third_message} />
        </Sequence>
        <Sequence from={390} durationInFrames={423}>
          <SceneFifth message={fourth_message} />
        </Sequence>
        <Sequence from={450} durationInFrames={363}>
          <SceneSixth message={fifth_message} />
        </Sequence>
        <Sequence from={510} durationInFrames={303}>
          <SceneSeventh message={sixth_message} />
        </Sequence>
        {with_watermark ?
          <Sequence from={0} durationInFrames={870}>
            <Watermark />
          </Sequence> : <></>
        }
      </AbsoluteFill>
    );
  };

export default Production;
