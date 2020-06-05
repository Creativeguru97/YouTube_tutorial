let thetaX;
let thetaY;
let r = 100;

function setup(){
  createCanvas(600, 400);
  angleMode(DEGREES);

  noStroke();
  fill(255);
}

function draw(){
  background(0);
  thetaX = map(mouseX, 0, width, 0, 720);
  let ballX = width/2 + r * cos(thetaX);
  let ballY = height/2 + r * sin(thetaX);
  ellipse(ballX, ballY, 25, 25);
}


function keyReleased(){
}

function keyPressed(){
}
