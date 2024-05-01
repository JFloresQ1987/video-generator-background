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
        durationInFrames={990}
        fps={config.fps}
        width={720}
        height={1280}
        defaultProps={{
          first_message: config.first_message,
        }}
      />
    </>
  );
};
