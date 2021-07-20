let faceapi;
let detections = [];

let img;
let canvas;

function preload(){
    img = loadImage('data/image1.png');
    // img = loadImage('data/image2.jpg');
    // img = loadImage('data/image3.jpg');
    // img = loadImage('data/image4.jpg');
}

function setup() {
  canvas = createCanvas(img.width, img.height);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5
  };

  //Initialize the model: モデルの初期化
  faceapi = ml5.faceApi(img, faceOptions, faceReady);
  stroke(255);
}

function faceReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(img, gotFaces);
}

// Got faces: 顔を検知
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;　//Now all the data in this detections: 全ての検知されたデータがこのdetectionの中に
  console.log(detections);

  image(img, 0,0, width, height);

  shadow1();
  shadow2();
  drawBoxs(detections);//Draw detection box: 顔の周りの四角の描画
  drawLandmarks(detections);//// Draw all the face points: 全ての顔のポイントの描画
  drawExpressions(detections, 650, 150, 32);//Draw face expression: 表情の描画
}

function drawBoxs(detections){
  for (f=0; f < detections.length; f++){
    const {_x, _y, _width, _height} = detections[f].alignedRect._box;
    let sWeight = int(_width / 100);
    if(sWeight <= 0){
      sWeight = 1;
    }else{}

    strokeWeight(sWeight);
    noFill();
    rect(_x, _y, _width, _height);
  }
}

function drawLandmarks(detections){
  for (f=0; f < detections.length; f++){
    const {_x, _y, _width, _height} = detections[f].alignedRect._box;
    let points = detections[f].landmarks.positions;
    let sWeight = int(_width / 50);
    if(sWeight <= 0){
      sWeight = 2;
    }else{}

    for (let i = 0; i < points.length; i++) {
      strokeWeight(sWeight);
      point(points[i]._x, points[i]._y);
    }
  }
}

function drawExpressions(detections){
  for (f=0; f < detections.length; f++){
    const {_x, _y, _width, _height} = detections[f].alignedRect._box;
    let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[f].expressions;

    let {tSize, x, y, textYSpace} = 0;
    if(_width > 300){
      tSize = int(_width / 10);
      x = _x + _width * 1.1;
      y = _y - _height * 0.2;
      textYSpace = tSize * 1.1;
    }else if (_width <= 300) {
      tSize = 10;
      let margin = (width - tSize * 8.5 * detections.length) / (detections.length+1);
      console.log(margin);
      x = margin * (f + 1) + tSize * 8.5 * f;
      y = 20;
      textYSpace = tSize * 1.1;

      strokeWeight(1);
      line(x, y+textYSpace*6+5, _x+_width/3, _y-5);
    }

    textFont('Helvetica Neue');
    textSize(tSize);
    noStroke();
    fill(255);

    // rect(x, y, tSize * 8.5, 10);

    text("neutral:       " + nf(neutral*100, 2, 2)+"%", x, y);
    text("happiness: " + nf(happy*100, 2, 2)+"%", x, y+textYSpace);
    text("anger:        " + nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
    text("sad:            "+ nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
    text("disgusted: " + nf(disgusted*100, 2, 2)+"%", x, y+textYSpace*4);
    text("surprised:  " + nf(surprised*100, 2, 2)+"%", x, y+textYSpace*5);
    text("fear:           " + nf(fearful*100, 2, 2)+"%", x, y+textYSpace*6);
  }
}

function keyTyped(){
  if (key === 's') {
    saveFrames('detection', 'png', 1, 25);
  }
}

function shadow1(){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 6;
  drawingContext.shadowColor = 'rgba(255, 255, 255, 100)';
}

function shadow2(){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = 'rgba(255, 255, 255, 100)';
}
