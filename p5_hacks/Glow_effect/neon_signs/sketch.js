let font;
let blockWall;
let coffee;

let offset = 0.0;

function preload(){
  font = loadFont('assets/AlexBrush-Regular.ttf');
  // font = loadFont('assets/TextMeOne-Regular.ttf');
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

  textNeon(
    'Coding Party',
    width/2,
    height/2,
    color(332, 58, 91, 100)
  );
  imageNeon(
    coffee,
    width*3/4,
    height/2-60,
    120, 100,
    color(27, 42, 97, 100)
  );
}

function textNeon(glowText, x, y, glowColor){
  glow(glowColor, 400);
  text(glowText, x, y);
  text(glowText, x, y);
  text(glowText, x, y);
  glow(glowColor, 80);
  text(glowText, x, y);
  text(glowText, x, y);
  glow(glowColor, 12);
  text(glowText, x, y);
  text(glowText, x, y);
  text(glowText, x, y);
}

function imageNeon(glowImage, x, y, width, height, glowColor){
  tint(0, 0, 40, 100);
  glow(glowColor, 0);
  image(glowImage, x, y, width, height);

  tint(0, 0, 100, flickering());
  glow(glowColor, 160);
  image(glowImage, x, y, width, height);
  glow(glowColor, 80);
  image(glowImage, x, y, width, height);
  image(glowImage, x, y, width, height);
  glow(glowColor, 12);
  image(glowImage, x, y, width, height);
  image(glowImage, x, y, width, height);

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
