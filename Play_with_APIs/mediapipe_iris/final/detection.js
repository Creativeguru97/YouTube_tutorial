//
let detections = {};
//
// const videoElement = document.getElementById('video');
//
// const faceMesh = new Hands({locateFile: (file) => {
//   return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
// }});
//
// faceMesh.setOptions({
//   maxNumFaces: 1,
//   minDetectionConfidence: 0.8,
//   minTrackingConfidence: 0.5
// });
//
// faceMesh.onResults(gotHands);
//
// function gotHands(results) {
//   detections = results;
//   console.log(detections);
// }
//
// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await hands.send({image: videoElement});
//   },
//   width: 640,
//   height: 480
// });
// camera.start();

async function main() {
  // Load the MediaPipe Facemesh package.
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);

  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
  // array of detected faces from the MediaPipe graph. If passing in a video
  // stream, a single prediction per frame will be returned.
  const predictions = await model.estimateFaces({
    input: document.querySelector("video")
  });

  if (predictions.length > 0) {
    console.log(predictions);
  }
}

main();
