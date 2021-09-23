
let detections = {};
let selfieDetections = {};

const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
// const canvasCtx = canvasElement.getContext('2d');

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});

faceMesh.setOptions({
  maxNumFaces: 2,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5
});

faceMesh.onResults(gotFaces);

function gotFaces(results){
  detections = results;
  // console.log(detections.multiFaceLandmarks[0][0]);
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();
