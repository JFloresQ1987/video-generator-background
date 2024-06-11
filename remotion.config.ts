import {Config} from '@remotion/cli/config';

Config.setCodec('h264');
// Config.setCodec('prores');
Config.setVideoBitrate("738K");
Config.setAudioBitrate("128K");
Config.setImageSequence(false);
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Config.setBrowserExecutable("/usr/bin/google-chrome-stable");
// Config.setBrowserExecutable("/usr/bin/chromium-browser");