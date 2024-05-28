import {
  AbsoluteFill,
  Sequence,
  continueRender,
  delayRender,
  staticFile
} from 'remotion';
import React from 'react';
import { Clip } from '../../../components/Clip';
import clip from '../../../assets/happy-birthay/mickey-mouse-1/video/clip.mp4';
import Watermark from '../../../components/Watermark';
import SceneFirst from './SceneFirst';
import SceneSecond from './SceneSecond';
import { Animated, Fade, Move, Scale } from 'remotion-animated';
// import SceneFirst from './SceneFirst';
// import SceneSecond from './SceneSecond';
// import SceneThird from './SceneThird';
// import SceneFourth from './SceneFourth';
// import SceneFifth from './SceneFifth';
// import SceneSixth from './SceneSixth';
// import SceneEnd from './SceneSeventh';


const waitForFont = delayRender();
const font = new FontFace(
  'MickeyMouse',
  `url('${staticFile("/fonts/mickey-mouse.ttf")}') format('truetype')`,
);

font
  .load()
  .then(() => {
    document.fonts.add(font);
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
        <Clip source={clip} />
        <Sequence from={5} durationInFrames={295}>
          <SceneFirst message={first_message} />
        </Sequence>
        <Sequence from={20} durationInFrames={280}>
          <SceneSecond message={second_message} />
        </Sequence>

        {/* <Sequence from={20} durationInFrames={280}>
          <Animated
            animations={[
              Scale({ by: 1, initial: 10 }),
              Move({ y: -40, start: 50 }),
              Move({ y: 40, start: 100 }),
              Fade({ to: 0, start: 150 }),
              Scale({ by: 0, start: 150, mass: 75 }),
            ]}
          >
            <SceneSecond message={second_message} />            
          </Animated>
        </Sequence> */}

        {/* <<Sequence from={188} durationInFrames={86}>
          <SceneThird message={third_message} />
        </Sequence>
        <Sequence from={330} durationInFrames={383}>
          <SceneFourth message={fourth_message} />
        </Sequence>
        <Sequence from={380} durationInFrames={333}>
          <SceneFifth message={fifth_message} />
        </Sequence>
        <Sequence from={425} durationInFrames={288}>
          <SceneSixth message={sixth_message} />
        </Sequence>
        <Sequence from={733} durationInFrames={137}>
          <SceneEnd message={"TE ESPERAMOS"} />
        </Sequence> */}
        {with_watermark ?
          <Sequence from={0} durationInFrames={870}>
            <Watermark />
          </Sequence> : <></>
        }
      </AbsoluteFill>
    );
  };

export default Production;
