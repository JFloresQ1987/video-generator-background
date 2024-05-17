import { Composition } from 'remotion';
import Production from './Production';
import { config } from '../../../config/happy-birthay/bob-esponja-1';

export const RemotionRoot: React.FC = () => {

  return (
    <>
      <Composition
        id="Production"
        component={Production}
        durationInFrames={config.durationInFrames}
        fps={config.fps}
        width={config.width}
        height={config.height}
        defaultProps={{
          with_watermark: config.with_watermark,
          first_message: config.first_message,
          second_message: config.second_message,
          third_message: config.third_message,
          fourth_message: config.fourth_message,
          fifth_message: config.fifth_message,
          sixth_message: config.sixth_message,
        }}
      />
    </>
  );
};
