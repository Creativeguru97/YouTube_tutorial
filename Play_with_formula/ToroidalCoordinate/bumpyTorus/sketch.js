let radius0_Slider, radius1_Slider;
let radius0Value, radius1Value;

let freqSlider, freqValue;
let freqSlider2, freqValue2;

let offset = 0;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(3);
  stroke(23, 59, 75);//color name: rakuda-iro
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
  background(0);//color name: torinoko-iro
  orbitControl(4, 4);//Mouse control

  rotateX(-25);

  bumpyTorus1();

  freqValue.html("frequency: " + freqSlider.value());
  freqValue2.html("frequency2: " + freqSlider2.value());
  radius0Value.html("radius0: " + radius0_Slider.value());
  radius1Value.html("radius1: " + radius1_Slider.value());

  offset += 0.5;
}

function bumpyTorus1(){
  for(let sigma = 0; sigma < 360; sigma += 8){
    beginShape();
    for(let phi = 0; phi < 360; phi += 8){
      let bump = (1+0.2*sin(phi*freqSlider.value())*sin(sigma*freqSlider2.value()));
      let x = (radius0_Slider.value() + radius1_Slider.value()*bump * cos(phi+offset)) * sin(sigma+offset/5);
      let y = radius1_Slider.value()*bump * sin(phi+offset);
      let z = (radius0_Slider.value() + radius1_Slider.value()*bump * cos(phi+offset)) * cos(sigma+offset/5);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

function bumpyTorus2(){//This is another type of equation of torus parametric coordinates!
  for(let tau = 1; tau < 2; tau += 1){
    for(let sigma = 0; sigma < 360; sigma += 5){
      beginShape(POINTS);
      for(let phi = 0; phi < 360; phi += 5){
        let bump = (1+0.1*sin(phi*freqSlider.value())*sin(sigma*freqSlider2.value()));
        let x = 100*bump * sinh(tau) * cos(phi) / (cosh(tau) - cos(sigma));
        let y = 100*bump * sinh(tau) * sin(phi) / (cosh(tau) - cos(sigma));
        let z = 100*bump * sin(sigma) / (cosh(tau) - cos(sigma));
        vertex(x, y, z);
      }
      endShape();
    }
  }
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
