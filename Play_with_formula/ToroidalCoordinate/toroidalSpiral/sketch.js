let r = 100;

let tauMaxSlider, tauMaxValue;
let freqSlider, freqValue;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  stroke(321, 38, 80);
  strokeWeight(3);
  noFill();

  //Create slider!
  tauMaxValue = createDiv();
  tauMaxValue.class("valueDisplay");
  tauMaxSlider = createSlider(0.5, 4, 1, 0.1);
  tauMaxSlider.class("Slider");

  freqValue = createDiv();
  freqValue.class("valueDisplay");
  freqSlider = createSlider(1, 20, 10, 0.01);
  freqSlider.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control
  rotateX(65);

  for(let tau = tauMaxSlider.value(); tau < tauMaxSlider.value()+1; tau += 1){
    beginShape();
    for(let phi = 0; phi < 360; phi += 0.2){
      let x = r * sinh(tau) * cos(phi) / (cosh(tau) - cos(phi*freqSlider.value()));
      let y = r * sinh(tau) * sin(phi) / (cosh(tau) - cos(phi*freqSlider.value()));
      let z = r * sin(phi*freqSlider.value()) / (cosh(tau) - cos(phi*freqSlider.value()));
      vertex(x, y, z);
    }
    endShape();
  }

  tauMaxValue.html("tau max value: " + tauMaxSlider.value());
  freqValue.html("frequency: " + freqSlider.value());
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
