let theta;
let r = 100;

function setup(){
  createCanvas(600, 400);
  angleMode(DEGREES);

  stroke(255);
  strokeWeight(1);
  fill(255, 50);//fill(R, G, B, Alpha); / fill(RGB, Alpha);
}

function draw(){
  background(0);
  num = map(mouseX, 0, width, 180, 30);
  if(num < 30) num = 30;

  beginShape();
  for(let angle = 0; angle < 360; angle += num){
    theta = angle;
    let ballX = width/2 + r * cos(theta);
    let ballY = height/2 + r * sin(theta);
    vertex(ballX, ballY);
  }
  endShape(CLOSE);
}


function keyReleased(){
}

function keyPressed(){
}
