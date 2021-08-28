
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

// ------------------------------
const selfieSegmentation = new SelfieSegmentation({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
}});

selfieSegmentation.setOptions({
  modelSelection: 1,
});

selfieSegmentation.onResults(gotSelfie);

function gotSelfie(results){
  // selfieDetections = results;
  // console.log(selfieDetections);

  // canvasCtx.save();
  // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // canvasCtx.drawImage(results.segmentationMask, 0, 0,
  //                     canvasElement.width, canvasElement.height);
  //
  // // Only overwrite existing pixels.
  // //source-in: fill bidy, source-out: fill background
  // canvasCtx.globalCompositeOperation = 'source-out';
  // canvasCtx.fillStyle = '#000000';
  // canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  //
  // // Only overwrite missing pixels.
  // canvasCtx.globalCompositeOperation = 'destination-atop';
  // canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  //
  // canvasCtx.restore();
}


const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({image: videoElement});
    await selfieSegmentation.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();
