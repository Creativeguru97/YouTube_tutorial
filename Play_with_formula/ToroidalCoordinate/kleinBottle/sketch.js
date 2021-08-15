let r0_Slider, r1_Slider;
let r0_Val, r1_Val;

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
  r0_Val = createDiv();
  r0_Val.class("valueDisplay");
  r0_Slider = createSlider(30, 80, 60, 1);
  r0_Slider.class("Slider");

  r1_Val = createDiv();
  r1_Val.class("valueDisplay");
  r1_Slider = createSlider(0, 5, 2.5, 0.1);
  r1_Slider.class("Slider");

  f0_Val = createDiv();
  f0_Val.class("valueDisplay");
  f0_Slider = createSlider(0, 5, 3, 0.01);
  f0_Slider.class("Slider");

  f1_Val = createDiv();
  f1_Val.class("valueDisplay");
  f1_Slider = createSlider(0, 10, 1, 0.01);
  f1_Slider.class("Slider");
}

function draw(){
  background(43, 19, 100);//color name: torinoko-iro
  orbitControl(4, 4);//Mouse control

  r0_Val.html("radius0: " + r0_Slider.value());
  r1_Val.html("radius1: " + r1_Slider.value());
  f0_Val.html("frequency0: " + f0_Slider.value());
  f1_Val.html("frequency1: " + f1_Slider.value());

  // KleinBottle_PaulBourke();
  // KleinBottle_wikipedia();
  // KleinBottle_Nordstrand();

  GraysKleinBottle(
    r0_Slider.value(),
    r1_Slider.value(),
    f0_Slider.value(),
    f1_Slider.value()
  );
  offset += 0.5;
}

function KleinBottle_wikipedia(){//Work well, but too complicated XD
  for(let theta = 0; theta < 360; theta += 8){
    beginShape(POINTS);
    for(let phi = 0; phi < 180; phi += 2){
      let x = 60*(-2/15*cos(phi)*(3*cos(theta)-30*sin(phi)+90*pow(cos(phi), 4)*sin(phi) - 60*pow(cos(phi), 6)*sin(phi)+5*cos(phi)*cos(theta)*sin(phi)));
      let y = 60*(-1/15*sin(phi)*(3*cos(theta)-3*pow(cos(phi), 2)*cos(theta)-48*pow(cos(phi), 4)*cos(theta)+48*pow(cos(phi), 6)*cos(theta)-60*sin(phi)+5*cos(phi)*cos(theta)*sin(phi)-5*pow(cos(phi), 3)*cos(theta)*sin(phi)-80*pow(cos(phi), 5)*cos(theta)*sin(phi)+80*pow(cos(phi), 7)*cos(theta)*sin(phi)));
      let z = 60*(2/15*(3+5*cos(phi)*sin(phi))*sin(theta));
      vertex(x, y, z);
    }
    endShape();
  }
}

function KleinBottle_PaulBourke(){//Doesn't work well
  for(let theta = 0; theta < 360; theta += 5){
    beginShape(POINTS);
    for(let phi = 0; phi < 180; phi += 5){
      let r = 4*(1-cos(phi)/2);
      let x = (6*cos(phi)*(1+sin(phi))+r*cos(phi)*cos(theta))*10;
      let y = (16*sin(phi)+r*sin(phi)*cos(theta))*10;
      let z = r*sin(theta)*10;
      vertex(x, y, z);
    }

    for(let phi = 180; phi < 360; phi += 5){
      let r = 4*(1-cos(phi)/2);
      let x = (6*cos(phi)*(1+sin(phi))+r*cos(phi+PI))*10;
      let y = (16*sin(phi))*10;
      let z = r*sin(theta)*10;
      vertex(x, y, z);
    }
    endShape();
  }
}

function KleinBottle_Nordstrand(){//Doesn't work well
  for(let theta = 0; theta < 360; theta += 8){
    beginShape(POINTS);
    for(let phi = 0; phi < 720; phi += 2){
      let x = 60*(cos(phi)*(cos(phi/2)*(sqrt(2)+cos(theta)) + sin(phi/2)*sin(theta)*cos(theta)));
      let y = 60*(sin(phi)*(cos(phi/2)*(sqrt(2)+cos(theta)) + sin(phi/2)*sin(theta)*cos(theta)));
      let z = 60*(-sin(phi/2)*(sqrt(2)+cos(theta)) + cos(phi/2)*sin(theta)*cos(theta));
      vertex(x, y, z);
    }
    endShape();
  }
}

function GraysKleinBottle(r0, r1, n, m){//Work well
  for(let theta = 0; theta < 360; theta += 5){
    beginShape();
    for(let phi = 0; phi < 720; phi += 5){
      let x = r0*((r1 + cos(n*phi/2.0) * sin(theta) - sin(n*phi/2.0) * sin(2*theta)) * cos(m*phi/2.0));
      let y = r0*((r1 + cos(n*phi/2.0) * sin(theta) - sin(n*phi/2.0) * sin(2*theta)) * sin(m*phi/2.0));
      let z = r0*(sin(n*phi/2.0) * sin(theta) + cos(n*phi/2.0) * sin(2*theta));
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
