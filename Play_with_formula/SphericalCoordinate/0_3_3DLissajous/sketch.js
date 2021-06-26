let r = 160;

let transformSlider;
let transformSlider2;

let transformValue;
let transformValue2;

function setup(){
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  strokeWeight(3);
  noFill();

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

  // rotateX(65);
  Lissajous3D();

  transformValue.html("transform value: " + transformSlider.value());
  transformValue2.html("transform value2: " + transformSlider2.value());
}

function Lissajous3D(){
  // beginShape();
  // for(let theta = 0; theta < 180; theta += 0.1){
  //     let x = r * pow(sin(theta * transformSlider.value()), 1) * pow(cos(theta * 25), 1);
  //     let y = r * pow(sin(theta * transformSlider.value()), 1) * pow(sin(theta * 25), 1);
  //     let z = r * pow(cos(theta * transformSlider2.value()), 1);
  //     vertex(x, y, z);
  // }
  // endShape();
  beginShape();
  for(let theta = 0; theta < 180; theta += 0.2){
    let x = r * cos(theta*transformSlider2.value());
    let y = r * sin(theta*transformSlider.value()) * sin(theta*25);
    let z = r * sin(theta*transformSlider.value()) * cos(theta*25);
    vertex(x, y, z);
  }
  endShape();

  // for(let phy = 0; phy < 180; phy += 10){
  //   beginShape();
  //     for(let theta = 0; theta < 360; theta += 5){
  //     let x = r * cos(phy);
  //     let y = r * sin(phy) * sin(theta);
  //     let z = r * sin(phy) * cos(theta);
  //     vertex(x, y, z);
  //   }
  //   endShape(CLOSE);
  // }
}
