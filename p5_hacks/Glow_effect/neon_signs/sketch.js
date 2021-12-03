let font;
let blockWall;
let coffee;

let offset = 0.0;

function preload(){
  font = loadFont('assets/AlexBrush-Regular.ttf');
  blockWall = loadImage('assets/blockWall.png');
  coffee = loadImage('assets/coffee.png');
}

function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);

  noFill();
  stroke(255);
  strokeWeight(3);

  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(128);

  imageMode(CENTER);
  pixelDensity(2);//High reso, slows frame rate
}

function draw(){
  frameRate(24);
  image(blockWall, width/2, height/2);
  textNeon(color(332, 58, 91, 100));
  imageNeon(
    width*3/4,
    height/2-60,
    color(27, 42, 97, 100)
  );
}

function textNeon(glowColor){
  glow(glowColor, 400);
  text('Coding Party', width/2, height/2);
  text('Coding Party', width/2, height/2);
  glow(glowColor, 80);
  text('Coding Party', width/2, height/2);
  text('Coding Party', width/2, height/2);
  glow(glowColor, 12);
  text('Coding Party', width/2, height/2);
  text('Coding Party', width/2, height/2);
}

function imageNeon(x, y, glowColor){
  tint(0, 0, 40, 100);
  glow(glowColor, 0);
  image(coffee, x, y, 120, 100);

  tint(0, 0, 100, flickering());
  glow(glowColor, 160);
  image(coffee, x, y, 120, 100);
  image(coffee, x, y, 120, 100);
  glow(glowColor, 80);
  image(coffee, x, y, 120, 100);
  image(coffee, x, y, 120, 100);
  glow(glowColor, 12);
  image(coffee, x, y, 120, 100);
  image(coffee, x, y, 120, 100);

  tint(0, 0, 100, 100);
}

function flickering(){
  offset += 0.08;
  let n = noise(offset);
  if(n < 0.30) return 0;
  else return 100;
}

function glow(glowColor, blurriness){
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}
