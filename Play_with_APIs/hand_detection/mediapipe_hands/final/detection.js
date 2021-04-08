
let detections = {};

const videoElement = document.getElementById('video');

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
  maxNumHands: 4,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5
});

hands.onResults(gotHands);

function gotHands(results) {
  detections = results;
  console.log(detections);
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();
