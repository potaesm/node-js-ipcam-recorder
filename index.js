const Recorder = require("./helpers/recorder");
// const FileHandler = require("./helpers/fileHandler");

const { CAM_USERNAME, CAM_PASSWORD, CAM_IP } = process.env;

let rec = new Recorder({
  url: `rtsp://${CAM_USERNAME}:${CAM_PASSWORD}@${CAM_IP}:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif`,
  timeLimit: 30,
  name: "front-01",
  audioCodec: "aac",
});

rec.startRecording();

setTimeout(() => {
  console.log("Stopping Recording");
  rec.stopRecording();
  rec = null;
}, 300000);
