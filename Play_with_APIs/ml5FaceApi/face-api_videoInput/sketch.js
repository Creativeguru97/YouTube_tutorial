let faceapi;
let detections = [];

let canvas;
let video;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id('canvas');

  // Creat the video: ビデオオブジェクトを作る
  video = createCapture(VIDEO);
  //Change the video input's aspect ratio according to canvas: キャンバスに合わせてビデオインプットの画面比を帰る．
  video.size(width, height);
  video.id('video');

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

// Start detecting faces: 顔認識開始
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces: 顔を検知
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  //Now all the data in this detections: 全ての検知されたデータがこのdetectionの中に
  detections = result;
  faceapi.detect(gotFaces);

  drawLandmarks(detections);//// Draw all the face points: 全ての顔のポイントの描画
  drawBoxs(detections);//Draw detection box: 顔の周りの四角の描画
  drawExpressions(detections, 20, 250, 14);//Draw face expression: 表情の描画
}

function draw() {
  clear();//Make back ground transparent: 背景を透明にする
}

function drawLandmarks(detections){
  if (detections.length > 0) {//If at least 1 face is detected: もし1つ以上の顔が検知されていたら
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(44, 169, 225);
        strokeWeight(3);
        point(points[i]._x, points[i]._y);
      }
    }
  }
}

function drawBoxs(detections){
  if (detections.length > 0) {//If at least 1 face is detected: もし1つ以上の顔が検知されていたら
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[0].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawExpressions(detections, x, y, textYSpace){
  if(detections.length > 0){//If at least 1 face is detected: もし1つ以上の顔が検知されていたら
    let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(14);
    noStroke();
    fill(44, 169, 225);

    text("neutral:       " + nf(neutral*100, 2, 2)+"%", x, y);
    text("happiness: " + nf(happy*100, 2, 2)+"%", x, y+textYSpace);
    text("anger:        " + nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
    text("sad:            "+ nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
    text("disgusted: " + nf(disgusted*100, 2, 2)+"%", x, y+textYSpace*4);
    text("surprised:  " + nf(surprised*100, 2, 2)+"%", x, y+textYSpace*5);
    text("fear:           " + nf(fearful*100, 2, 2)+"%", x, y+textYSpace*6);
  }else{//If no faces is detected: 顔が1つも検知されていなかったら
    text("neutral: ", x, y);
    text("happiness: ", x, y + textYSpace);
    text("anger: ", x, y + textYSpace*2);
    text("sad: ", x, y + textYSpace*3);
    text("disgusted: ", x, y + textYSpace*4);
    text("surprised: ", x, y + textYSpace*5);
    text("fear: ", x, y + textYSpace*6);
  }
}
