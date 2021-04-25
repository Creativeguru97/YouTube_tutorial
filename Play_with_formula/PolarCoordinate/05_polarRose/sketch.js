let theta;
let r = 150;

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(2);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  noFill();
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  rose();
  // madnessOfPattern();
}

function rose(){
  let angleMax = map(mouseX, 0, width, 0, 360);
  beginShape();
  for(let angle = 0; angle < angleMax; angle += 1){
    theta = angle;
    let ballX = r*cos(6*theta) * cos(theta);
    let ballY = r*cos(6*theta) * sin(theta);
    vertex(ballX, ballY);
  }
  endShape();
}

function madnessOfPattern(){
  let angleMax = map(mouseX, 0, width, 0, 360);

  beginShape();
  for(let angle = 0; angle < angleMax; angle += 0.2){
    theta = angle;
    let ballX = r*tan(9*theta) * pow(cos(theta), 2);
    let ballY = r*tan(6*theta) * pow(sin(theta), 2);
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
