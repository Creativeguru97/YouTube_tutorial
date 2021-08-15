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
  colorMode(HSB, 360, 100, 100);

  stroke(23, 59, 75);//color name: rakuda-iro
  strokeWeight(4);
  noFill();

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
  background(43, 19, 100);//color name: torinoko-iro
  orbitControl(4, 4);//Mouse control
  rotateX(-25);

  torusType1();

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

function torusType1(){
  for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += 360/sigmaDensitySlider.value()){
    beginShape();
    for(let phi = 0; phi < phiMaxSlider.value(); phi += 360/phiDensitySlider.value()){
      let x = (radius0_Slider.value()+radius1_Slider.value() * cos(phi+offset)) * sin(sigma+offset);
      let y = radius1_Slider.value() * sin(phi+offset);
      let z = (radius0_Slider.value()+radius1_Slider.value() * cos(phi+offset)) * cos(sigma+offset);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

function torusType2(sigmaDensity, phiDensity){//This is another type of the torus parametric equation!
  beginShape(POINTS);
  for(let tau = 1; tau < 2; tau += 1){
    for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += 360/sigmaDensity){
      for(let phi = 0; phi < phiMaxSlider.value(); phi += 360/phiDensity){
        let x = 100 * sinh(tau) * cos(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let y = 100 * sinh(tau) * sin(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let z = 100 * sin(sigma+offset) / (cosh(tau) - cos(sigma+offset));
        vertex(x, y, z);
      }
    }
  }
  endShape();
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
