let r = 160;
let noiseScale = 0;
let noiseX = 0;
let noiseY = 0;
let xAdd = 0.01;
let yAdd = 0.01;


let thetaMaxSlider, phyMaxSlider;
let thetaDensitySlider, phyDensitySlider;
let thetaMaxValue, phyMaxValue;
let thetaDensityValue, phyDensityValue;

function setup(){
  createCanvas(800, 600, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  //Create slider!
  thetaMaxValue = createDiv();
  thetaMaxValue.class("valueDisplay");
  thetaMaxSlider = createSlider(0, 180, 180, 10);
  thetaMaxSlider.class("Slider");

  phyMaxValue = createDiv();
  phyMaxValue.class("valueDisplay");
  phyMaxSlider = createSlider(0, 360, 360, 10);
  phyMaxSlider.class("Slider");

  thetaDensityValue = createDiv();
  thetaDensityValue.class("valueDisplay");
  thetaDensitySlider = createSlider(10, 45, 45, 1);
  thetaDensitySlider.class("Slider");

  phyDensityValue = createDiv();
  phyDensityValue.class("valueDisplay");
  phyDensitySlider = createSlider(10, 45, 45, 1);
  phyDensitySlider.class("Slider");
}

function draw(){
  background(0);
  orbitControl(4, 4);//Mouse control

  strokeWeight(1);
  let thetaDensityMappedVal = map(thetaDensitySlider.value(), 10, 45, 45, 10);
  let phyDensityMappedVal = map(phyDensitySlider.value(), 10, 45, 45, 10);

  xAdd += 0.01;
  noiseX = xAdd;
  yAdd += 0.01;

  rotateX(65);
  for(let theta = 4; theta < thetaMaxSlider.value(); theta += thetaDensityMappedVal){
    noiseY = 0;
    for(let phy = 0; phy < phyMaxSlider.value(); phy += phyDensityMappedVal){

      let radius = r + map(noise(noiseX, noiseY), 0, 1, -10, 10);
      let x = radius * sin(theta) * cos(phy);
      let y = radius * sin(theta) * sin(phy);
      let z = radius * cos(theta);

      stroke(phy, 100, 100);
      point(x, y, z);

      noiseY += 0.1;
    }
    noiseX += 0.1;
  }

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  phyMaxValue.html("phi max value: " + phyMaxSlider.value());

  let thetaDensityDisplayVal = int(map(thetaDensitySlider.value(), 10, 45, 1, 36));
  let phyDensityDisplayVal = int(map(phyDensitySlider.value(), 10, 45, 1, 36));

  thetaDensityValue.html("theta density value: " + thetaDensityDisplayVal);
  phyDensityValue.html("phi density value: " + phyDensityDisplayVal);
}
