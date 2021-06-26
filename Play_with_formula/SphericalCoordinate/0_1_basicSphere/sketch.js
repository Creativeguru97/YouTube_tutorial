let r = 0;

let thetaMaxSlider, phyMaxSlider;
let thetaDensitySlider, phyDensitySlider;
let thetaMaxValue, phyMaxValue;
let thetaDensityValue, phyDensityValue;

function setup(){
  createCanvas(700, 700, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  strokeWeight(2);
  noFill();

  r = width/4;

  //Create slider!
  thetaMaxValue = createDiv();
  thetaMaxValue.class("valueDisplay");
  thetaMaxSlider = createSlider(0, 360, 360, 10);
  thetaMaxSlider.class("Slider");

  phyMaxValue = createDiv();
  phyMaxValue.class("valueDisplay");
  phyMaxSlider = createSlider(0, 180, 180, 10);
  phyMaxSlider.class("Slider");

  thetaDensityValue = createDiv();
  thetaDensityValue.class("valueDisplay");
  thetaDensitySlider = createSlider(5, 120, 110, 1);
  thetaDensitySlider.class("Slider");

  phyDensityValue = createDiv();
  phyDensityValue.class("valueDisplay");
  phyDensitySlider = createSlider(2, 120, 110, 1);
  phyDensitySlider.class("Slider");
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control

  let thetaDensityMappedVal = map(thetaDensitySlider.value(), 5, 120, 120, 5);
  let phyDensityMappedVal = map(phyDensitySlider.value(), 2, 120, 120, 2);

  rotateY(90);
  rotateZ(65);
  for(let phy = 0; phy < phyMaxSlider.value(); phy += phyDensityMappedVal){
    beginShape();
      for(let theta = 0; theta < thetaMaxSlider.value(); theta += thetaDensityMappedVal){
      let x = r * cos(phy);
      let y = r * sin(phy) * sin(theta);
      let z = r * sin(phy) * cos(theta);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  phyMaxValue.html("phi max value: " + phyMaxSlider.value());

  let thetaDensityDisplayVal = int(map(thetaDensitySlider.value(), 5, 120, 1, 36));
  let phyDensityDisplayVal = int(map(phyDensitySlider.value(), 2, 120, 1, 36));

  thetaDensityValue.html("theta density value: " + thetaDensityDisplayVal);
  phyDensityValue.html("phi density value: " + phyDensityDisplayVal);
}
