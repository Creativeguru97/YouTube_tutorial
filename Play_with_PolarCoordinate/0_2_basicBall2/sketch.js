let theta;
let r = 100;

function setup(){
  createCanvas(600, 400);
  angleMode(DEGREES);

  noStroke();
  fill(255);
}

function draw(){
  background(0);
  num = map(mouseX, 0, width, 180, 30);
  if(num < 30) num = 30;
  for(let angle = 0; angle < 360; angle += num){
    theta = angle;
    let ballX = width/2 + r * cos(theta);
    let ballY = height/2 + r * sin(theta);
    ellipse(ballX, ballY, 8, 8);
  }
}


function keyReleased(){
}

function keyPressed(){
}
