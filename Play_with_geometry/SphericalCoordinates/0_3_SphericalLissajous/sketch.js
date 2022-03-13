let r = 220;
let freqSlider, freqSlider2;
let freqValue, freqValue2;
let angle = 60, angle2 = 50;

function setup(){
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(199, 80, 88);
  strokeWeight(7);
  noFill();

  freqValue = createDiv();
  freqValue.class("valueDisplay");
  freqSlider = createSlider(1, 12, 7, 0.01);
  freqSlider.class("Slider");

  freqValue2 = createDiv();
  freqValue2.class("valueDisplay");
  freqSlider2 = createSlider(1, 12, 8, 0.01);
  freqSlider2.class("Slider");

  pixelDensity(1);
}

function draw(){
  // background(230, 50, 15);
  clear();
  orbitControl(4, 4);//Mouse control

  rotateY(90);
  rotateZ(40);

  SphericalLissajous();
  // SphericalLissajous_Animated();

  freqValue.html("frequency: " + freqSlider.value());
  freqValue2.html("frequency2: " + freqSlider2.value());
}

function SphericalLissajous(){
  beginShape();
  for(let theta = 0; theta < 360; theta += 0.1){
    let x = r * cos(theta*freqSlider.value());
    let y = r * sin(theta*freqSlider.value()) * sin(theta*freqSlider2.value());
    let z = r * sin(theta*freqSlider.value()) * cos(theta*freqSlider2.value());
    vertex(x, y, z);
  }
  endShape(CLOSE);
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
