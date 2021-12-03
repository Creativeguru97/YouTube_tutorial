function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
}

function draw(){
  background(230, 50, 15);

  glowRect(width/4, height/2, 300, 1, 10, color(255, 100));
  glowRect(width/2+55, height/2, 200, 3, 7, color(27, 42, 97, 100));//color name: 洒落柿(しゃれがき)
  glowRect(width*3/4, height/2, 100, 6, 10, color(3, 48, 93, 100));//color name: 甚三紅(じんざもみ)
}

function glowRect(x, y, size, depth, blurriness, rectColor){
  noFill();
  stroke(rectColor);
  strokeWeight(size/12);

  glow(rectColor, blurriness);

  for(let i=0; i<depth; i++){
    rect(x, y, size, size, size/10);
  }
}

function glow(glowColor, blurriness){
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}
