let r = 160;

let agents = [];

let thetaNoise;
let offset = 0;

function setup(){
  createCanvas(800, 600, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  for(let i = 0; i < 150; i++){
    let agent = new Agent();
    agents.push(agent);
  }

  // console.log(agents);
}

function draw(){
  background(0);
  orbitControl(4, 4);//Mouse control

  rotateX(90);

  for(let i = 0; i < agents.length; i++){
    // thetaNoise = noise(i+offset*noiseScale);
    // mappedNoise = map(thetaNoise, 0, 1, -80, 80);

    agents[i].move();
    agents[i].show();
  }
  // offset += 1;
}
