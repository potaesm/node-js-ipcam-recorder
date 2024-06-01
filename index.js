const Recorder = require("./helpers/recorder");
const FileHandler = require("./helpers/fileHandler");

const { CAM_USERNAME, CAM_PASSWORD, CAM_IP } = process.env;

const rec = new Recorder({
  url: `rtsp://${CAM_USERNAME}:${CAM_PASSWORD}@${CAM_IP}:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif`,
  timeLimit: 60,
  name: "front-01",
  // https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/
  directoryPathFormat: "YYYY-MM-DD",
  fileNameFormat: "HH-mm-ss",
});

rec.startRecording();

const fh = new FileHandler();

setInterval(() => {
  // console.log("Stopping Recording");
  // rec.stopRecording();
  fh.getDirectorySize("media", (err, byte) => {
    if (err) {
      console.log(err);
      return;
    }
    const limitByteSize = 15 * 1024 * 1024 * 1024;
    const ageOfToBeDeletedItemsInSeconds = 1 * 24 * 60 * 60;
    if (byte >= limitByteSize) {
      console.log("Media size has reached limit");
      const result = fh.removeOlder("media", ageOfToBeDeletedItemsInSeconds);
      console.log("Deleted", result);
    } else {
      console.log("Media size is within limit");
    }
  });
}, 30000);
