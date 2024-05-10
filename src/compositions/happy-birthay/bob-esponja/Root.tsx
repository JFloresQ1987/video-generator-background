import { Composition } from 'remotion';
import { config } from '../../../config';
import Production from './Production';

export const RemotionRoot: React.FC = () => {

  return (
    <>
      <Composition
        id="Production"
        component={Production}
        // durationInFrames={config.durationInFrames}
        durationInFrames={870}
        fps={config.fps}
        width={720}
        height={1428}
        defaultProps={{
          with_watermark: config.with_watermark,
          first_message: config.first_message,
        }}
      />
    </>
  );
};
