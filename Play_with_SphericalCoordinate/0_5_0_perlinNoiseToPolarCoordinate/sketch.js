let r = 160;
let thetaNoise = 0;
let noiseAdd = 0;

function setup(){
  createCanvas(600, 400);//size(600, 400);
  angleMode(DEGREES);
}

function draw(){
  background(0);

  translate(width/2, height/2);
  // orbitControl(4, 4);//Mouse control


  noiseAdd += 0.01;
  thetaNoise = noiseAdd;

  let theta = map(noise(thetaNoise), 0, 1, 0, 360);

  let x = r * cos(theta);
  let y = r * sin(theta);

  ellipse(x, y, 50, 50);
}
