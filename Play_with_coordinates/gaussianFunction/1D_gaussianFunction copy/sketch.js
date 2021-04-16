let r = 100;

function setup(){
  createCanvas(960, 540);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw(){
  background(230, 50, 15, 100);

  for(let x = 0; x < width; x += 15){
      // let y = height/2 - gaussian_1D(x, 80, mouseX, 60);
      let y = height/2 - advancedGaussian_1D(x, 50, mouseX, 40, width/3);

      stroke(210, 100, 100, 100);
      strokeWeight(6);
      point(x, y);
  }
}

function gaussian_1D(x, a, b, c){
  return a * Math.exp(-pow(x-b, 2) / pow(2*c, 2));
}

function advancedGaussian_1D(x, a, b, c, period){
  let weight = 0;
  let periodDelta = 0;

  for(let i=0; i<width/period; i++){
    weight += a * Math.exp(-pow(x - (b-periodDelta), 2) / pow(2*c, 2));
    periodDelta -= period;
  }
  return weight;
}
