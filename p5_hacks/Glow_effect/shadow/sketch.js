//Font size: 24

function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);

  noFill();
  stroke(255);
  strokeWeight(20);
}

function draw(){
  background(207, 7, 99);

  glow(color(212, 7, 70, 100), 12);
  rect(width/2, height/2, 300, 300, 30);
}

function glow(glowColor, blurriness){
  let offsetX = map(mouseX, 0, width, 20, -20);
  let offsetY = map(mouseY, 0, height, 20, -20);
  drawingContext.shadowOffsetX = offsetX;
  drawingContext.shadowOffsetY = offsetY;
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}
