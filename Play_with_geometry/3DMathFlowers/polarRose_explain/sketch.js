let canvas;
let r = 200;
let offset = 0;
let freq = 0;

let freqSlider, yOffSlider;
let frequency, yOff;
let radius = 100;

let font;
let takeAbs = false;

function preload(){
  font = loadFont('hanzipen-sc-regular.otf');
}

function setup(){
  canvas = createCanvas(1200, 900);
  canvas.class("canvas");
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  // strokeWeight(1);
  stroke(75, 79, 51, 100);
  // fill(32, 18, 99, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(font);

  frequency = createDiv();
  frequency.class("valueDisplay");
  freqSlider = createSlider(1, 10, 1, 0.1);
  freqSlider.class("Slider");

  yOff = createDiv();
  yOff.class("valueDisplay");
  yOffSlider = createSlider(-240, 240, 0, 10);
  yOffSlider.class("Slider");
}

function draw(){
  clear();
  translate(width/2, height/2);

  // shadow();
  polarRoseExplain(radius);
  frequency.html("frequency: " + nf(freqSlider.value(), 1, 1));
  yOff.html("Y offset: " + nf(yOffSlider.value()/radius, 1, 1));
}

function polarRoseExplain(radius){
  offset = yOffSlider.value();
  freq = freqSlider.value();

  fill(75, 79, 51, 100);
  strokeWeight(1.5);
  // Draw Cartesian coordinate
  drawingContext.setLineDash([0, 0]);
  line(40, 0, width/2, 0);//x-axis
  line(180+width/20, height/2.5, 180+width/20, -height/2.2);//y-axis
  text("0", -12+width/20+180, 15);//centre
  text("π", 375+width/20, 15);//centre
  text("- π", -30+width/20, 15);//centre

  drawingContext.setLineDash([1, 8]);
  line(-width/2, -radius-offset, width/2, -radius-offset);
  line(-width/2, radius-offset, width/2, radius-offset);
  line(360+width/20, height/2.5, 360+width/20, -height/2.4);
  line(width/20, height/2.5, width/20, -height/2.4);

  let cosHeight = map(offset, 160, -160, 3, -1);
  drawingContext.setLineDash([0, 0]);
  text(nf(cosHeight, 1, 1), -35+width/20, -radius-offset+8);
  text(nf(cosHeight-2, 1, 1), -35+width/20, radius-offset+8);

  // Draw Polar coordinate
  text("0", -width/4-12, 15);//centre
  noFill();
  line(40, 0, -width/2, 0);//x-axis
  line(-width/4, height/2.5, -width/4, -height/2.2);//y-axis

  drawingContext.setLineDash([1, 8]);
  ellipse(-width/4, 0, (-radius+offset)*2);
  ellipse(-width/4, 0, (radius+offset)*2);

  strokeWeight(5);
  drawingContext.setLineDash([0, 0]);
  //Draw polar rose
  beginShape();
  for(let theta = 0; theta < 360; theta += 1){
    let x, y;
    if(takeAbs){
      x = (radius * abs(sin(freq*theta))+offset) * cos(theta)-width/4;
      y = (radius * abs(sin(freq*theta))+offset) * sin(theta);
    }else if (!takeAbs) {
      x = (radius * sin(freq*theta)+offset) * cos(theta)-width/4;
      y = (radius * sin(freq*theta)+offset) * sin(theta);
    }
    vertex(x, y);
  }
  endShape();

  //Draw cosine wave
  beginShape();
  for(let theta = 0; theta < 360; theta += 1){
    let waveX = theta+width/20;
    let waveY;
    if(takeAbs) waveY = -(radius * abs(sin(theta * freq))+offset);
    else if(!takeAbs) waveY = -(radius * sin(theta * freq)+offset);
    vertex(waveX, waveY);
  }
  endShape();

  push();
  strokeWeight(1.5);
  fill(75, 79, 51, 100);
  textSize(42);
  if(takeAbs){
    text("y = abs(sin(" + str(nf(freq, 1, 1)) + "x)) + (" + str(nf(cosHeight-1, 1, 1)) + ")", width/4, height/2-55);//centre
    text("r = abs(sin(" + str(nf(freq, 1, 1)) + "φ)) + (" + str(nf(cosHeight-1, 1, 1)) + ")", -width/4, height/2-55);//centre
  }else if (!takeAbs) {
    text("y = sin(" + str(nf(freq, 1, 1)) + "x) + (" + str(nf(cosHeight-1, 1, 1)) + ")", width/4, height/2-55);//centre
    text("r = sin(" + str(nf(freq, 1, 1)) + "φ) + (" + str(nf(cosHeight-1, 1, 1)) + ")", -width/4, height/2-55);//centre
  }
  pop();
}

function keyTyped(){
  if(key == "a") takeAbs = !takeAbs;
}

function shadow(){
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = -2;
  drawingContext.shadowBlur = 4;
  drawingContext.shadowColor = 'rgba(75, 79, 90, 100)';
}
