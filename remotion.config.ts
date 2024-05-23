import {Config} from '@remotion/cli/config';

Config.setCodec('h264');
Config.setVideoBitrate("738K");
Config.setAudioBitrate("128K");
Config.setImageSequence(false);
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);