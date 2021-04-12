let theta;
let r = 10;

let freqX = 1;
let freqY = 1;

function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);

  noStroke();
  fill(255);
}

function draw(){
  background(0);

  let radiusOffset = 0;
  let angleMax = map(mouseX, 0, width, 180, 1080);
  if(angleMax > 1080) angleMax = 1080;
  if(angleMax < 180) angleMax = 180;

  for(let angle = 0; angle < angleMax; angle += 5){
    theta = angle;
    let ballX = width/2 + (r+radiusOffset) * cos(theta);
    let ballY = height/2 + (r+radiusOffset) * sin(theta);
    ellipse(ballX, ballY, 4, 4);

    radiusOffset += 1;
  }
}


function keyReleased(){
}

function keyPressed(){
}
