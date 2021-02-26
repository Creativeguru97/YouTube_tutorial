// ml5 Face Detection Model
let faceapi;
let detections = [];

let canvas;
let video;

let happy;
let angry;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id('canvas');

  // Creat the video and start face tracking
  video = createCapture(VIDEO);
  video.size(width, height);//Change the canvas then ratio of video input changes too.
  video.id('video');

  // Only need landmarks for this example
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);

  // console.log(detections[0]);

  happy = detections[0].expressions.happy;
  angry = detections[0].expressions.angry;

  // console.log("----------");
  // console.log("happy: "+ happy);
  // console.log("angry: "+angry);
}

function draw() {
  // background(0);
  clear();

  // Draw all the face points
  if (detections.length > 0) {
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(56, 161, 219);
        strokeWeight(3);
        point(points[i]._x, points[i]._y);
      }
    }
  }

  if (detections.length > 0) {
    for (f=0; f < detections.length; f++){
      //Draw detection box
      let {_x, _y, _width, _height} = detections[0].alignedRect._box;
      stroke(56, 161, 219);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}
