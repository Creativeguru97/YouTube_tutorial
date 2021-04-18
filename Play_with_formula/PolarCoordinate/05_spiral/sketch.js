let theta;
let r = 10;

function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  noStroke();
  fill(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  spiral();
}

function spiral(){
  let radiusOffset = 0;
  let angleMax = map(mouseX, 0, width, 180, 1080);

  for(let angle = 0; angle < angleMax; angle += 6){
    theta = angle;
    let ballX = (r+radiusOffset) * cos(theta);
    let ballY = (r+radiusOffset) * sin(theta);
    ellipse(ballX, ballY, 5, 5);

    radiusOffset += 1;
  }
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
