let r = 160;

let freqSlider, freqSlider2;

let freqValue, freqValue2;

let angle = 60, angle2 = 50;

function setup(){
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  strokeWeight(3);
  noFill();

  freqValue = createDiv();
  freqValue.class("valueDisplay");
  freqSlider = createSlider(1, 12, 1, 0.01);
  freqSlider.class("Slider");

  freqValue2 = createDiv();
  freqValue2.class("valueDisplay");
  freqSlider2 = createSlider(1, 12, 1, 0.01);
  freqSlider2.class("Slider");
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control
  //Detail about this function: https://p5js.org/reference/#/p5/orbitControl

  rotateY(90);
  rotateZ(40);

  SphericalLissajous();
  // SphericalLissajous_Animated();

  freqValue.html("frequency value: " + freqSlider.value());
  freqValue2.html("frequency value2: " + freqSlider2.value());
}

function SphericalLissajous(){
  beginShape();
  for(let theta = 0; theta < 360; theta += 0.1){
    let x = r * cos(theta*freqSlider.value());
    let y = r * sin(theta*freqSlider.value()) * sin(theta*freqSlider2.value());
    let z = r * sin(theta*freqSlider.value()) * cos(theta*freqSlider2.value());
    vertex(x, y, z);
  }
  endShape(LINES);
}

function SphericalLissajous_Animated(){
  let freq = 10*sin(angle);
  let freq2 = 10*sin(angle2);

  beginShape();
  for(let theta = 0; theta < 360; theta += 0.1){
    let x = r * cos(theta*freq);
    let y = r * sin(theta*freq) * sin(theta*freq2);
    let z = r * sin(theta*freq) * cos(theta*freq2);
    vertex(x, y, z);
  }
  endShape();

  angle += 0.05;
  angle2 += 0.05;
}
