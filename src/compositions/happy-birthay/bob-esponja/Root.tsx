import { Composition } from 'remotion';
import { config } from '../../../config';
import Production from './Production';

export const RemotionRoot: React.FC = () => {

  return (
    <>
      <Composition
        id="Production"
        component={Production}
        durationInFrames={config.durationInFrames}
        fps={config.fps}
        width={720}
        height={1428}
        defaultProps={{
          first_message: config.first_message,
        }}
      />
    </>
  );
};
