let theta;
let r = 100;

let freqX = 1;
let freqY = 1;

function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);

  stroke(255);
  strokeWeight(1);
  fill(255, 50);//fill(R, G, B, Alpha); / fill(RGB, Alpha);
}

function draw(){
  background(0);

  freqX = map(mouseX, 0, width, 1, 20);
  freqY = map(mouseY, 0, height, 1, 20);

  beginShape();
  for(let angle = 0; angle < 360; angle += 1){
    theta = angle;
    let ballX = width/2 + r * cos(theta * freqX);
    let ballY = height/2 + r * sin(theta * freqY);
    vertex(ballX, ballY);
  }
  endShape(CLOSE);

}


function keyReleased(){
}

function keyPressed(){
}
