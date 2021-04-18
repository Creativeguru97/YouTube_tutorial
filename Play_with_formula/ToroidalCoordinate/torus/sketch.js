let r = 100;

let tauMaxSlider, sigmaMaxSlider, phiMaxSlider;
let tauDensitySlider, sigmaDensitySlider, phiDensitySlider;
let tauMaxValue, sigmaMaxValue, phiMaxValue;
let tauDensityValue, sigmaDensityValue, phiDensityValue;

let periodSlider, softnessSlider;
let periodValue, softnessValue;

function setup(){
  createCanvas(960, 540, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  stroke(255);

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

  tauDensityValue = createDiv();
  tauDensityValue.class("valueDisplay");
  tauDensitySlider = createSlider(0.2, 1, 0.2, 0.01);
  tauDensitySlider.class("Slider");

  sigmaDensityValue = createDiv();
  sigmaDensityValue.class("valueDisplay");
  sigmaDensitySlider = createSlider(10, 45, 45, 1);
  sigmaDensitySlider.class("Slider");

  phiDensityValue = createDiv();
  phiDensityValue.class("valueDisplay");
  phiDensitySlider = createSlider(10, 45, 45, 1);
  phiDensitySlider.class("Slider");

  periodValue = createDiv();
  periodValue.class("valueDisplay");
  periodSlider = createSlider(45, 360, 360, 1);
  periodSlider.class("Slider");

  softnessValue = createDiv();
  softnessValue.class("valueDisplay");
  softnessSlider = createSlider(5, 60, 45, 1);
  softnessSlider.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control
  //Detail about this function: https://p5js.org/reference/#/p5/orbitControl

  let tauDensityMappedVal = map(tauDensitySlider.value(), 0.2, 1, 1, 0.2);
  let sigmaDensityMappedVal = map(sigmaDensitySlider.value(), 10, 45, 45, 10);
  let phiDensityMappedVal = map(phiDensitySlider.value(), 10, 45, 45, 10);

  rotateX(65);

  let mouseXmapped = map(mouseX, 0, width, 360, 0);
  let mouseYmapped = map(mouseY, 0, height, 180, 0);

  for(let tau = tauMaxSlider.value(); tau < tauMaxSlider.value()+1; tau += tauDensityMappedVal){
    for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += sigmaDensityMappedVal){

      for(let phi = 0; phi < phiMaxSlider.value(); phi += phiDensityMappedVal){
        let x = r * sinh(tau) * cos(phi) / (cosh(tau) - cos(sigma));
        let y = r * sinh(tau) * sin(phi) / (cosh(tau) - cos(sigma));
        let z = r * sin(sigma) / (cosh(tau) - cos(sigma));

        // let weight = advancedGaussian(phi, 10, mouseXmapped, softnessSlider.value(), periodSlider.value());
        let weight = advancedGaussian_2D(phi, sigma, 10, mouseXmapped, mouseYmapped, softnessSlider.value(), softnessSlider.value(), periodSlider.value());
        strokeWeight(weight);
        stroke(phi, 50, 255);
        point(x, y, z);
      }
    }
  }

  tauMaxValue.html("tau max value: " + tauMaxSlider.value());
  sigmaMaxValue.html("sigma max value: " + sigmaMaxSlider.value());
  phiMaxValue.html("phi max value: " + phiMaxSlider.value());

  let tauDensityDisplayVal = int(map(tauDensitySlider.value(), 0.2, 1, 1, 55));
  let sigmaDensityDisplayVal = int(map(sigmaDensitySlider.value(), 10, 45, 1, 36));
  let phiDensityDisplayVal = int(map(phiDensitySlider.value(), 10, 45, 1, 36));

  tauDensityValue.html("tau density value: " + tauDensityDisplayVal);
  sigmaDensityValue.html("sigma density value: " + sigmaDensityDisplayVal);
  phiDensityValue.html("phi density value: " + phiDensityDisplayVal);

  periodValue.html("period value: " + periodSlider.value());
  softnessValue.html("softness value: " + softnessSlider.value());
}



function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}

function gaussian(x, a, b, c){
  return a * Math.exp(-pow(x - (b-360), 2) / pow(2*c, 2)) +
          a * Math.exp(-pow(x-b, 2) / pow(2*c, 2)) +
          a * Math.exp(-pow(x - (b+360), 2) / pow(2*c, 2));
}

function advancedGaussian(x, a, b, c, period){//I'm working on now
  let weight = 0;
  let periodDelta = 1440/2;

  for(let i=0; i<1440/period; i++){
    weight += a * Math.exp(-pow(x - (b-periodDelta), 2) / pow(2*c, 2));
    periodDelta -= period;
  }
  return weight;
}

function gaussian_2D(x, y, a, x0, y0, cx, cy){
  return a * Math.exp(-(pow(x-x0, 2) / pow(2*cx, 2) + pow(y-y0, 2) / pow(2*cy, 2)));
}

function advancedGaussian_2D(x, y, a, x0, y0, cx, cy, period){
  let weight = 0;
  let periodDeltaX = 1440/2;
  let periodDeltaY = 1440/2;

  for(let i=0; i<1440/period; i++){
    for(let j=0; j<1440/period; j++){
      weight += a * Math.exp(-(
        pow(x-(x0-periodDeltaX), 2) / pow(2*cx, 2) +　
        pow(y-(y0-periodDeltaY), 2) / pow(2*cy, 2)
      ));
      periodDeltaX -= period;
    }
    periodDeltaY -= period;
    periodDeltaX = width/2;
  }
  periodDeltaY = width/2;

  return weight;
}
