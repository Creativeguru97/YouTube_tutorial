let yNoise = 0;
let noiseXAdd = 0;

function setup(){
  createCanvas(700, 400);

}


function draw(){
  background(0);

  for(let i=1; i<6; i++){
    let x = 100 * i;
    let noiseVal = map(noise(i*yNoise), 0, 1, -50, 50);

    ellipse(x, height/2+noiseVal, 30, 30);
  }

  yNoise += 0.005;
}
