let r = 100;
let r0 = 130, r1 = 80;

let sigmaMaxSlider, phiMaxSlider;
let sigmaDensitySlider, phiDensitySlider;
let sigmaMaxValue, phiMaxValue;
let sigmaDensityValue, phiDensityValue;

let radius0_Slider, radius1_Slider;
let radius0Value, radius1Value;

let offset = 0;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  stroke(255);
  strokeWeight(3);

  //Create sliders!
  radius0Value = createDiv();
  radius0Value.class("valueDisplay");
  radius0_Slider = createSlider(0, 200, 130, 1);
  radius0_Slider.class("Slider");

  radius1Value = createDiv();
  radius1Value.class("valueDisplay");
  radius1_Slider = createSlider(0, 200, 80, 1);
  radius1_Slider.class("Slider");

  sigmaMaxValue = createDiv();
  sigmaMaxValue.class("valueDisplay");
  sigmaMaxSlider = createSlider(0, 360, 360, 10);
  sigmaMaxSlider.class("Slider");

  phiMaxValue = createDiv();
  phiMaxValue.class("valueDisplay");
  phiMaxSlider = createSlider(0, 360, 360, 10);
  phiMaxSlider.class("Slider");

  sigmaDensityValue = createDiv();
  sigmaDensityValue.class("valueDisplay");
  sigmaDensitySlider = createSlider(10, 45, 45, 1);
  sigmaDensitySlider.class("Slider");

  phiDensityValue = createDiv();
  phiDensityValue.class("valueDisplay");
  phiDensitySlider = createSlider(10, 45, 45, 1);
  phiDensitySlider.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control

  let sigmaDensity = map(sigmaDensitySlider.value(), 10, 45, 45, 10);
  let phiDensity = map(phiDensitySlider.value(), 10, 45, 45, 10);

  rotateX(65);

  // torusType1(sigmaDensity, phiDensity);
  torusType2(sigmaDensity, phiDensity);

  radius0Value.html("radius0: " + radius0_Slider.value());
  radius1Value.html("radius1: " + radius1_Slider.value());
  sigmaMaxValue.html("sigma max: " + sigmaMaxSlider.value());
  phiMaxValue.html("phi max: " + phiMaxSlider.value());

  let sigmaDensityDisplayVal = int(map(sigmaDensitySlider.value(), 10, 45, 1, 36));
  let phiDensityDisplayVal = int(map(phiDensitySlider.value(), 10, 45, 1, 36));
  sigmaDensityValue.html("sigma density: " + sigmaDensityDisplayVal);
  phiDensityValue.html("phi density: " + phiDensityDisplayVal);

  offset -= 0.1;
}

function torusType1(sigmaDensity, phiDensity){//This is another type of the equation!
  for(let tau = 1; tau < 2; tau += 1){
    for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += sigmaDensity){
      for(let phi = 0; phi < phiMaxSlider.value(); phi += phiDensity){
        let x = r * sinh(tau) * cos(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let y = r * sinh(tau) * sin(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let z = r * sin(sigma+offset) / (cosh(tau) - cos(sigma+offset));

        stroke(phi, 50, 255);
        point(x, y, z);
      }
    }
  }
}

function torusType2(sigmaDensity, phiDensity){
  for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += sigmaDensity){
    for(let phi = 0; phi < phiMaxSlider.value(); phi += phiDensity){
      let x = cos(phi+offset) * (radius0_Slider.value()+radius1_Slider.value() * cos(sigma+offset));
      let y = sin(phi+offset) * (radius0_Slider.value()+radius1_Slider.value() * cos(sigma+offset));
      let z = radius1_Slider.value() * sin(sigma+offset);

      stroke(phi, 50, 255);
      point(x, y, z);
    }
  }
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
