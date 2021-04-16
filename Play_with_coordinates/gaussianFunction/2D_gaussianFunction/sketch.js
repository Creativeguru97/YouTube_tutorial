let r = 100;

function setup(){
  createCanvas(960, 540, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);
  rotateX(65);

  for(let x = -width/2; x < width/2; x += 20){
    for(let y = -width/2; y < width/2; y += 20){
      // let z = gaussian_2D(x, y, 120, 0, 0, 60, 60);
      let z = advancedGaussian_2D(x, y, 60, mouseX, mouseY-height/2, 30, 30, width/4);

      stroke(210, 100, 100, 100);
      strokeWeight(8);
      point(x, y, z);
    }
  }
}

function gaussian_2D(x, y, a, x0, y0, cx, cy){
  return a * Math.exp(-(
    pow(x-x0, 2) / pow(2*cx, 2) +
    pow(y-y0, 2) / pow(2*cy, 2)
  ));
}

function advancedGaussian_2D(x, y, a, x0, y0, cx, cy, period){
  let weight = 0;
  let periodDelta = width/2;

  for(let i=0; i<width/period; i++){
    weight += a * Math.exp(-(
      pow(x-(x0-periodDelta), 2) / pow(2*cx, 2) +　
      pow(y-y0, 2) / pow(2*cy, 2)
    ));
    periodDelta -= period;
  }
  return weight;
}
