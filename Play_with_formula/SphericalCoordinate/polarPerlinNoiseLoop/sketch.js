let nosieMaxSlider;
let nosieMaxValue;

let noiseMax = 0.5;
let zOff = 0;

function setup(){
  createCanvas(700, 700);
  // angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  strokeWeight(3);
  noFill();

  //Create slider!
  noiseMaxValue = createDiv();
  noiseMaxValue.class("valueDisplay");
  noiseMaxSlider = createSlider(0, 20, 10, 0.1);
  noiseMaxSlider.class("Slider");
}

function draw(){
  background(230, 50, 15);
  translate(width/2, height/2);

  polarPerlinNoiseLoop();
  shadow();

  noiseMaxValue.html("noise max value: " + noiseMaxSlider.value());
}

function polarPerlinNoiseLoop(){
  beginShape();
  for(let theta = 0; theta < TWO_PI; theta += 0.02){
    let xOff = map(cos(theta), -1, 1, 0, noiseMaxSlider.value());
    let yOff = map(sin(theta), -1, 1, 0, noiseMaxSlider.value());
    let r = map(noise(xOff, yOff, zOff), 0, 2, 100, 200);
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);

  }
  endShape(CLOSE);
  zOff += 0.02;
}

function shadow(){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = 'rgba(255, 255, 255)';
}
