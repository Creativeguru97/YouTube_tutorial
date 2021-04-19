let theta;
let r = 150;

let freqX = 1;
let freqY = 1;

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  noFill();
  stroke(32, 18, 99, 100);
  strokeWeight(1);
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  trigonometry();
}

function trigonometry(){
  // freqX = 3;
  // freqY = 2;
  freqX = map(mouseX, 0, width, 1, 20);
  freqY = map(mouseY, 0, height, 1, 20);

  beginShape();
  for(let angle = 0; angle < 360; angle += 1){
    theta = angle;
    let ballX = r * cos(theta * freqX);
    let ballY = r * sin(theta * freqY);
    vertex(ballX, ballY);
  }
  endShape();
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
