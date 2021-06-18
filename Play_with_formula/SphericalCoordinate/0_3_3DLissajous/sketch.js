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
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  strokeWeight(3);
  noFill();

  //Create slider!
  thetaMaxValue = createDiv();
  thetaMaxValue.class("valueDisplay");
  thetaMaxSlider = createSlider(0, 180, 180, 1);
  thetaMaxSlider.class("Slider");

  densityValue = createDiv();
  densityValue.class("valueDisplay");
  densitySlider = createSlider(1, 50, 25, 0.1);
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
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control
  //Detail about this function: https://p5js.org/reference/#/p5/orbitControl

  rotateX(65);
  Lissajous3D();

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  densityValue.html("theta density value: " + densitySlider.value());
  transformValue.html("transform value: " + transformSlider.value());
  transformValue2.html("transform value2: " + transformSlider2.value());
}

function Lissajous3D(){
  beginShape();
  for(let theta = 0; theta < thetaMaxSlider.value(); theta += 0.5){
      let x = r * pow(sin(theta * transformSlider.value()), 1) * pow(cos(theta * densitySlider.value()), 1);
      let y = r * pow(sin(theta * transformSlider.value()), 1) * pow(sin(theta * densitySlider.value()), 1);
      let z = r * pow(cos(theta * transformSlider.value()), 1);
      vertex(x, y, z);
  }
  endShape();
}
