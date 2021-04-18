let thetaX;
let thetaY;

let r = 100;
let freqX = 5;
let freqY = 6;

function setup(){
  createCanvas(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  noStroke();
  fill(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  trigonometry();
}

function trigonometry(){
  thetaX = map(mouseX, 0, width, 0, 720);
  thetaY = map(mouseY, 0, width, 0, 720);
  let ballX = r * cos(thetaX * freqX);
  let ballY = r * sin(thetaY * freqY);

  ellipse(ballX, ballY, 16, 16);
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
