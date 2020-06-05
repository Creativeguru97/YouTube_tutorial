let r = 160;

let thetaMaxSlider;
let densitySlider;
let transformSlider;
let transformSlider2;

let thetaMaxValue;
let densityValue;
let transformValue;
let transformValue2;

function setup(){
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);

  stroke(255);

  //Create slider!
  thetaMaxValue = createDiv();
  thetaMaxValue.class("valueDisplay");
  thetaMaxSlider = createSlider(0, 180, 180, 1);
  thetaMaxSlider.class("Slider");

  densityValue = createDiv();
  densityValue.class("valueDisplay");
  densitySlider = createSlider(1, 25, 25, 1);
  densitySlider.class("Slider");

  transformValue = createDiv();
  transformValue.class("valueDisplay");
  transformSlider = createSlider(1, 12, 1, 0.01);
  transformSlider.class("Slider");
  transformSlider.id("transformSlider");

  transformValue2 = createDiv();
  transformValue2.class("valueDisplay");
  transformSlider2 = createSlider(1, 12, 1, 0.01);
  transformSlider2.class("Slider");
  transformSlider2.id("transformSlider");
}

function draw(){
  background(0);
  orbitControl(4, 4);//Mouse control
  //Detail about this function: https://p5js.org/reference/#/p5/orbitControl

  rotateX(65);
  for(let theta = 0; theta < thetaMaxSlider.value(); theta += 0.5){
      let x = r * sin(theta * transformSlider.value()) * cos(theta * densitySlider.value());
      let y = r * sin(theta * transformSlider.value()) * sin(theta * densitySlider.value());
      let z = r * cos(theta * transformSlider2.value());
      point(x, y, z);
  }

  // for(let theta = 0; theta < thetaMaxSlider.value(); theta += thetaDensityMappedVal){
  //   for(let phy = 0; phy < phyMaxSlider.value(); phy += phyDensityMappedVal){
  //     let x = r * sin(theta) * cos(phy);
  //     let y = r * sin(theta) * sin(phy);
  //     let z = r * cos(theta);
  //
  //     point(x, y, z);
  //   }
  // }

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  densityValue.html("theta density value: " + densitySlider.value());
  transformValue.html("transform value: " + transformSlider.value());
  transformValue2.html("transform value2: " + transformSlider2.value());
}
