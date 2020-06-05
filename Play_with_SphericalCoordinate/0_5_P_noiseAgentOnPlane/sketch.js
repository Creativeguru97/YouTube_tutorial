
let agents = [];
let noiseScale = 120;
let noiseStrength = 10;
let overlayAlpha = 10;
let agentsAlpha = 90;
let strokeWidth = 1;


function setup(){
  createCanvas(800, 600, P2D);
  smooth();

  for(let i=0; i<2000; i++){
    let agent = new Agent();
    agents.push(agent);
  }
}


function draw(){
  fill(0, overlayAlpha);
  noStroke();
  rect(0, 0, width, height);


  stroke(255, overlayAlpha);
  strokeWeight(1);
  // ellipse(width/2, height/2, 80, 80);
  for (let i=0; i<agents.length; i++){
    agents[i].update(noiseScale, noiseStrength);
  };
}

function keyReleased() {
  if (key == ' ') {
    let newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }

}
