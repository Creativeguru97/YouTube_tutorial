let agents = [];

let thetaNoise;
let offset = 0;
let noiseScale = 0.015;

function setup(){
  createCanvas(800, 800, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  noFill();
  stroke(205, 100, 100);
  strokeWeight(3);

  for(let i = 0; i < 3000; i++){
    let agent = new Agent();
    agents.push(agent);
  }

  // setInterval(()=>{
  //   noiseSeed(random(1000));
  // }, 10000);
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control

  rotateX(55);
  rotateZ(frameCount/6);

  beginShape(POINTS);
  for(let i = 0; i < agents.length; i++){
    agents[i].move();
    agents[i].show();
  }
  endShape();
}
