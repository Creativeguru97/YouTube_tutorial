let pointLocation;
let locationStore;
let offset = 0;


let freq = 1;
let freq2 = 1;
let tauOffset = 0;

let isAnimate = false;

let osctheta = 180;

function setup(){
  createCanvas(displayWidth, displayHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(1);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  noFill();

  pointLocation = createVector(random(-width/2-20, width/2-20), random(-height/2-20, height/2-20));
  locationStore = pointLocation;
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  orbitControl(4, 4);//Mouse control

  coordinate(width/3.5, 0);

  push();
  translate(-width/3.5, 0);
  polarCoordinate(170);
  pop();

  push();
  rotateX(80);
  sphericalCoordinate(170);
  pop();

  push();
  translate(width/3.5, 0);
  rotateX(65);
  toroidalCoordinate(85);
  pop();
  offset+=0.2;

  let oscillation = width*cos(osctheta) + width;
  freq = map(oscillation, 0, width*2, 1, 3);
  let oscillation2 = width*cos(osctheta*2) + width;
  freq2 = map(oscillation2, 0, width*2, 1, 3);
  osctheta+=0.4;
}

function coordinate(translateX, translateY){
  //x-axis
  line(-width/2+20, 0, width/2-20, 0);
  //y-axis_left
  line(-translateX, -height/4, -translateX, height/4);
  //y-axis_center
  line(0, -height/4, 0, height/4);
  //y-axis_right
  line(translateX, -height/4, translateX, height/4);

  line(0, translateY, -height, 0, translateY, height);

  line(translateX, translateY, -height, translateX, translateY, height);
}

function polarCoordinate(radius){
  let redPoint = createVector(0, 0);
  strokeWeight(4);
  for(let theta = 0; theta < 360; theta += 2){
    let x = radius * cos(theta+offset);
    let y = radius * sin(theta*freq+offset);
    point(x, y);
  }
}

function sphericalCoordinate(radius){
  let redPoint = createVector(0, 0, 0);
  strokeWeight(4);
  for(let theta = 0; theta < 180; theta += 0.3){
      let x = radius * sin(theta*freq) * cos(theta*30+offset);
      let y = radius * sin(theta*freq) * sin(theta*30+offset);
      let z = radius * cos(theta);
      point(x, y, z);
  }
}

function toroidalCoordinate(radius){
  for(let tau = freq2; tau < freq2+1; tau += 1){
    for(let sigma = 0; sigma < 360; sigma += 10){
      for(let phi = 0; phi < 360; phi += 10){
        let x = radius * sinh(tau) * cos(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let y = radius * sinh(tau) * sin(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let z = radius * sin(sigma+offset) / (cosh(tau) - cos(sigma+offset));

        strokeWeight(4);
        point(x, y, z);
        strokeWeight(1);
      }
    }
  }
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
