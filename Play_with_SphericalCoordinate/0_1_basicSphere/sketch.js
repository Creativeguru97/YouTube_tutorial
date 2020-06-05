let r = 100;

let thetaMaxSlider, phyMaxSlider;
let thetaDensitySlider, phyDensitySlider;
let thetaMaxValue, phyMaxValue;
let thetaDensityValue, phyDensityValue;

function setup(){
  createCanvas(600, 400, WEBGL);//size(600, 400);
  angleMode(DEGREES);

  stroke(255);

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
  //Detail about this function: https://p5js.org/reference/#/p5/orbitControl

  // let thetaMax = map(mouseX, 0, width, 0, 180);
  // let phyMax = map(mouseY, 0, height, 0, 360);

  // if(thetaMax > 180) thetaMax = 180;
  // if(phyMax > 360) phyMax = 360;
  //
  // let thetaDensity = map(mouseX, 0, width, 45, 10);
  // if(thetaDensity < 10) thetaDensity = 10;
  //
  // let phyDensity = map(mouseY, 0, height, 45, 10);
  // if(phyDensity < 10) phyDensity = 10;

  let thetaDensityMappedVal = map(thetaDensitySlider.value(), 10, 45, 45, 10);
  let phyDensityMappedVal = map(phyDensitySlider.value(), 10, 45, 45, 10);

  rotateX(65);
  for(let theta = 0; theta < thetaMaxSlider.value(); theta += thetaDensityMappedVal){
    for(let phy = 0; phy < phyMaxSlider.value(); phy += phyDensityMappedVal){
      let x = r * sin(theta) * cos(phy);
      let y = r * sin(theta) * sin(phy);
      let z = r * cos(theta);

      point(x, y, z);
    }
  }

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  phyMaxValue.html("phi max value: " + phyMaxSlider.value());

  let thetaDensityDisplayVal = int(map(thetaDensitySlider.value(), 10, 45, 1, 36));
  let phyDensityDisplayVal = int(map(phyDensitySlider.value(), 10, 45, 1, 36));

  thetaDensityValue.html("theta density value: " + thetaDensityDisplayVal);
  phyDensityValue.html("phi density value: " + phyDensityDisplayVal);
}
