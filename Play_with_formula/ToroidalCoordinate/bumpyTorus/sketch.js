let r = 100;

let tauMaxSlider, sigmaMaxSlider, phiMaxSlider;
let tauDensitySlider, sigmaDensitySlider, phiDensitySlider;
let tauMaxValue, sigmaMaxValue, phiMaxValue;
let tauDensityValue, sigmaDensityValue, phiDensityValue;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(3);
  stroke(321, 38, 80);
  noFill();

  //Create slider!
  tauMaxValue = createDiv();
  tauMaxValue.class("valueDisplay");
  tauMaxSlider = createSlider(0.5, 4, 1, 0.1);
  tauMaxSlider.class("Slider");

  sigmaMaxValue = createDiv();
  sigmaMaxValue.class("valueDisplay");
  sigmaMaxSlider = createSlider(0, 360, 360, 10);
  sigmaMaxSlider.class("Slider");

  phiMaxValue = createDiv();
  phiMaxValue.class("valueDisplay");
  phiMaxSlider = createSlider(0, 360, 360, 10);
  phiMaxSlider.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control

  rotateX(65);

  for(let tau = tauMaxSlider.value(); tau < tauMaxSlider.value()+1; tau += 1){
    for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += 5){
      beginShape(POINTS);
      for(let phi = 0; phi < phiMaxSlider.value(); phi += 5){
        let x = r*(1+0.2*sin(phi*6)*sin(sigma*6)) * sinh(tau) * cos(phi) / (cosh(tau) - cos(sigma));
        let y = r*(1+0.2*sin(phi*6)*sin(sigma*6)) * sinh(tau) * sin(phi) / (cosh(tau) - cos(sigma));
        let z = r*(1+0.2*sin(phi*6)*sin(sigma*6)) * sin(sigma) / (cosh(tau) - cos(sigma));
        vertex(x, y, z);
      }
      endShape();
    }
  }

  tauMaxValue.html("tau max value: " + tauMaxSlider.value());
  sigmaMaxValue.html("sigma max value: " + sigmaMaxSlider.value());
  phiMaxValue.html("phi max value: " + phiMaxSlider.value());
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
