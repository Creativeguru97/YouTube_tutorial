let freqSlider, freqValue;

let radius0_Slider, radius1_Slider;
let radius0Value, radius1Value;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  stroke(23, 59, 75);//color name: rakuda-iro
  strokeWeight(5);
  noFill();

  //Create slider!
  radius0Value = createDiv();
  radius0Value.class("valueDisplay");
  radius0_Slider = createSlider(0, 200, 130, 1);
  radius0_Slider.class("Slider");

  radius1Value = createDiv();
  radius1Value.class("valueDisplay");
  radius1_Slider = createSlider(0, 200, 80, 1);
  radius1_Slider.class("Slider");

  freqValue = createDiv();
  freqValue.class("valueDisplay");
  freqSlider = createSlider(1, 20, 10, 0.01);
  freqSlider.class("Slider");
}

function draw(){
  background(43, 19, 100);//color name: torinoko-iro
  orbitControl(4, 4);//Mouse control
  rotateX(-25);

  toroidalSpiral();

  radius0Value.html("radius0: " + radius0_Slider.value());
  radius1Value.html("radius1: " + radius1_Slider.value());
  freqValue.html("frequency: " + freqSlider.value());
}

function toroidalSpiral(){
  beginShape();
  for(let phi = 0; phi < 360; phi += 0.2){
    let x = (radius0_Slider.value()+radius1_Slider.value() * cos(phi*freqSlider.value())) * sin(phi);
    let y = radius1_Slider.value() * sin(phi*freqSlider.value());
    let z = (radius0_Slider.value()+radius1_Slider.value() * cos(phi*freqSlider.value())) * cos(phi);
    vertex(x, y, z);
  }
  endShape();
}

function toroidalSpiral2(){//This is another type of equation of torus parametric coordinates!
  for(let tau = tauMaxSlider.value(); tau < tauMaxSlider.value()+1; tau += 1){
    beginShape();
    for(let phi = 0; phi < 360; phi += 0.2){
      let x = 100 * sinh(tau) * cos(phi) / (cosh(tau) - cos(phi*freqSlider.value()));
      let y = 100 * sinh(tau) * sin(phi) / (cosh(tau) - cos(phi*freqSlider.value()));
      let z = 100 * sin(phi*freqSlider.value()) / (cosh(tau) - cos(phi*freqSlider.value()));
      vertex(x, y, z);
    }
    endShape();
  }
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
