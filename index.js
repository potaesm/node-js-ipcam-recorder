const Recorder = require("./helpers/recorder");
// const FileHandler = require("./helpers/fileHandler");

const { CAM_USERNAME, CAM_PASSWORD, CAM_IP } = process.env;
console.log({ CAM_USERNAME, CAM_PASSWORD, CAM_IP });

const rec = new Recorder({
  url: `rtsp://${CAM_USERNAME}:${CAM_PASSWORD}@${CAM_IP}:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif`,
  timeLimit: 60,
  name: "front-01",
});

rec.startRecording();

setTimeout(() => {
  console.log("Stopping Recording");
  rec.stopRecording();
  rec = null;
}, 300000);
