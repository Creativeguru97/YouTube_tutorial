let r = 100;
let r0 = 130, r1 = 80;

let radius0_Slider, radius1_Slider;
let radius0Value, radius1Value;

let freqSlider, freqValue;
let freqSlider2, freqValue2;

let offset = 0;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(5);
  stroke(321, 38, 80);
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
  freqSlider = createSlider(0, 10, 6, 0.01);
  freqSlider.class("Slider");

  freqValue2 = createDiv();
  freqValue2.class("valueDisplay");
  freqSlider2 = createSlider(0, 10, 6, 0.01);
  freqSlider2.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control

  rotateX(65);

  // bumpyTorus();
  bumpyTorus2();

  freqValue.html("frequency: " + freqSlider.value());
  freqValue2.html("frequency2: " + freqSlider2.value());
  radius0Value.html("radius0: " + radius0_Slider.value());
  radius1Value.html("radius1: " + radius1_Slider.value());

  offset -= 0.5;
}

function bumpyTorus(){
  for(let tau = 1; tau < 2; tau += 1){
    for(let sigma = 0; sigma < 360; sigma += 5){
      beginShape(POINTS);
      for(let phi = 0; phi < 360; phi += 5){
        let bump = (1+0.1*sin(phi*freqSlider.value())*sin(sigma*freqSlider2.value()));
        let x = r*bump * sinh(tau) * cos(phi) / (cosh(tau) - cos(sigma));
        let y = r*bump * sinh(tau) * sin(phi) / (cosh(tau) - cos(sigma));
        let z = r*bump * sin(sigma) / (cosh(tau) - cos(sigma));
        vertex(x, y, z);
      }
      endShape();
    }
  }
}

function bumpyTorus2(){
  for(let sigma = 0; sigma < 360; sigma += 5){
    beginShape(POINTS);
    for(let phi = 0; phi < 360; phi += 5){
      let bump = (1+0.1*sin(phi*freqSlider.value())*sin(sigma*freqSlider2.value()));
      let x = cos(phi+offset/5) * (radius0_Slider.value()*bump + radius1_Slider.value()*bump * cos(sigma+offset));
      let y = sin(phi+offset/5) * (radius0_Slider.value()*bump + radius1_Slider.value()*bump * cos(sigma+offset));
      let z = radius1_Slider.value()*bump * sin(sigma+offset);
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
