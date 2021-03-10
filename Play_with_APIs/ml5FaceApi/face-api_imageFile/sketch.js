let faceapi;
let detections = [];

let img;
let canvas;

function preload(){
    img = loadImage('data/image0.png');
}

function setup() {
  canvas = createCanvas(1920, 1080);

  img.resize(width, height);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5
  };

  //Initialize the model: モデルの初期化
  faceapi = ml5.faceApi(img, faceOptions, faceReady);
}

function faceReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detectSingle(img, gotFaces);
}

// Got faces: 顔を検知
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;　//Now all the data in this detections: 全ての検知されたデータがこのdetectionの中に
  console.log(detections);

  background(255);
  image(img, 0,0, width, height);

  drawBoxs(detections);//Draw detection box: 顔の周りの四角の描画
  drawLandmarks(detections);//// Draw all the face points: 全ての顔のポイントの描画
  drawExpressions(detections, 650, 150, 32);//Draw face expression: 表情の描画

  saveFrames('detection', 'png', 1, 25);
}

function drawBoxs(detections){
  const {_x, _y, _width, _height} = detections.alignedRect._box;
  stroke(215, 0, 58);
  strokeWeight(4);
  noFill();
  rect(_x, _y, _width, _height);
}

function drawLandmarks(detections){
  let points = detections.landmarks.positions;
  for (let i = 0; i < points.length; i++) {
    stroke(215, 0, 58);
    strokeWeight(8);
    point(points[i]._x, points[i]._y);
  }
}

function drawExpressions(detections, x, y, textYSpace){
  let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections.expressions;
  textFont('Helvetica Neue');
  textSize(28);
  noStroke();
  fill(215, 0, 58);

  text("neutral:       " + nf(neutral*100, 2, 2)+"%", x, y);
  text("happiness: " + nf(happy*100, 2, 2)+"%", x, y+textYSpace);
  text("anger:        " + nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
  text("sad:            "+ nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
  text("disgusted: " + nf(disgusted*100, 2, 2)+"%", x, y+textYSpace*4);
  text("surprised:  " + nf(surprised*100, 2, 2)+"%", x, y+textYSpace*5);
  text("fear:           " + nf(fearful*100, 2, 2)+"%", x, y+textYSpace*6);
}
