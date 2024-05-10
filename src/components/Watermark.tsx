import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const Watermark: React.FC<{}> = () => {

  // const frame = useCurrentFrame();

  // const { width } = useVideoConfig();

  // const rotate = interpolate(frame, [0, 1], [0, 1]);

  return (
    <div
      style={{
        // position: "relative",
        // top: "35%",
        // left: "50%",
        // transform: "translate(50%, 50%)",
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        // width: '100%',

        //       display: flex;
        // justify-content: center;
        // align-items: center;
      }}
    >
      <Img
        // src="./assets/watermark/watermark.png"
        src={staticFile("/images/watermark.png")}
        alt="watermark"
        style={{
          width: '700px',
          // width: width / 3.5,
          // borderRadius: `${width / 2}%`,
          // border: `50px solid ${backgroundColor}`,
          // transform: `rotate(${rotate}deg)`,
        }}
      />
    </div>
  );
};

export default Watermark;
