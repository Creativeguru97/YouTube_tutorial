let r = 160;
let noiseScale = 0;
let noiseX = 0;
let noiseY = 0;
let xAdd = 0.01;
let yAdd = 0.01;


let thetaMaxSlider, phiMaxSlider;
let thetaDensitySlider, phiDensitySlider;
let thetaMaxValue, phiMaxValue;
let thetaDensityValue, phiDensityValue;

function setup(){
  createCanvas(800, 600, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  //Create slider!
  thetaMaxValue = createDiv();
  thetaMaxValue.class("valueDisplay");
  thetaMaxSlider = createSlider(0, 180, 180, 10);
  thetaMaxSlider.class("Slider");

  phiMaxValue = createDiv();
  phiMaxValue.class("valueDisplay");
  phiMaxSlider = createSlider(0, 360, 360, 10);
  phiMaxSlider.class("Slider");

  thetaDensityValue = createDiv();
  thetaDensityValue.class("valueDisplay");
  thetaDensitySlider = createSlider(10, 45, 45, 1);
  thetaDensitySlider.class("Slider");

  phiDensityValue = createDiv();
  phiDensityValue.class("valueDisplay");
  phiDensitySlider = createSlider(10, 45, 45, 1);
  phiDensitySlider.class("Slider");
}

function draw(){
  background(0);
  orbitControl(4, 4);//Mouse control

  strokeWeight(1);
  let thetaDensityMappedVal = map(thetaDensitySlider.value(), 10, 45, 45, 10);
  let phiDensityMappedVal = map(phiDensitySlider.value(), 10, 45, 45, 10);

  xAdd += 0.01;
  noiseX = xAdd;
  yAdd += 0.01;

  rotateX(65);
  for(let theta = 4; theta < thetaMaxSlider.value(); theta += thetaDensityMappedVal){
    noiseY = 0;
    for(let phi = 0; phi < phiMaxSlider.value(); phi += phiDensityMappedVal){

      // In this example, I applied noise to theta and phi instead of radius.
      let positionNoise = map(noise(noiseX, noiseY), 0, 1, -10, 10);
      let x = r * sin(theta+positionNoise) * cos(phi+positionNoise);
      let y = r * sin(theta+positionNoise) * sin(phi+positionNoise);
      let z = r * cos(theta+positionNoise);

      stroke(phi, 100, 100);
      point(x, y, z);

      noiseY += 0.1;
    }
    noiseX += 0.1;
  }

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  phiMaxValue.html("phi max value: " + phiMaxSlider.value());

  let thetaDensityDisplayVal = int(map(thetaDensitySlider.value(), 10, 45, 1, 36));
  let phiDensityDisplayVal = int(map(phiDensitySlider.value(), 10, 45, 1, 36));

  thetaDensityValue.html("theta density value: " + thetaDensityDisplayVal);
  phiDensityValue.html("phi density value: " + phiDensityDisplayVal);
}
