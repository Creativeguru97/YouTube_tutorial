let r = 200;
let noiseScale = 0;

let colNoiseOffset = 0;

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
  thetaDensitySlider = createSlider(2, 45, 36, 1);
  thetaDensitySlider.class("Slider");

  phiDensityValue = createDiv();
  phiDensityValue.class("valueDisplay");
  phiDensitySlider = createSlider(2, 45, 36, 1);
  phiDensitySlider.class("Slider");
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control

  strokeWeight(5);
  let thetaDensityMappedVal = map(thetaDensitySlider.value(), 2, 45, 45, 2);
  let phiDensityMappedVal = map(phiDensitySlider.value(), 2, 45, 45, 2);

  rotateX(65);
  // rippingSphere();
  wavingSphere();
  // colorDebug();

  thetaMaxValue.html("theta max value: " + thetaMaxSlider.value());
  phiMaxValue.html("phi max value: " + phiMaxSlider.value());

  let thetaDensityDisplayVal = int(map(thetaDensitySlider.value(), 7, 45, 1, 36));
  let phiDensityDisplayVal = int(map(phiDensitySlider.value(), 7, 45, 1, 36));

  thetaDensityValue.html("theta density value: " + thetaDensityDisplayVal);
  phiDensityValue.html("phi density value: " + phiDensityDisplayVal);
}

function rippingSphere(){
  for(let theta = 0; theta < 180; theta += 4){
    for(let phi = 0; phi < 360; phi += 4){
      let noiseX = map(sin(theta)*cos(phi), -1, 1, 0, 3);
      let noiseY = map(sin(theta)*sin(phi), -1, 1, 0, 3);
      let noiseZ = map(cos(theta), -1, 1, 0, 3);

      let radius = r + map(noise(noiseX, noiseY, noiseZ+colNoiseOffset), 0, 1, -30, 30);
      let x = radius * sin(theta) * cos(phi);
      let y = radius * sin(theta) * sin(phi);
      let z = radius * cos(theta);

      let hue = map(noise(noiseX, noiseY, noiseZ+colNoiseOffset), 0, 1, 150, 340);
      stroke(hue, 100, 100);
      beginShape(POINTS);
      vertex(x, y, z);
      endShape();
    }
  }
  colNoiseOffset+=0.01;
}

function wavingSphere(){
  for(let theta = 0; theta < 180; theta += 3){
    for(let phi = 0; phi < 180; phi += 3){
      let noiseX = map(sin(theta)*cos(phi), -1, 1, 0, 3);
      let noiseY = map(sin(theta)*sin(phi), -1, 1, 0, 3);
      let noiseZ = map(cos(theta), -1, 1, 0, 3);

      let offset = map(noise(noiseX, noiseY, noiseZ+colNoiseOffset), 0, 1, -10, 10);
      let x = r * sin(theta+offset) * cos(phi+offset);
      let y = r * sin(theta+offset) * sin(phi+offset);
      let z = r * cos(theta+offset);

      let hue = map(noise(noiseX, noiseY, noiseZ+colNoiseOffset), 0, 1, 150, 340);
      stroke(hue, 100, 100);
      point(x, y, z);
    }
  }
  colNoiseOffset+=0.01;
}
