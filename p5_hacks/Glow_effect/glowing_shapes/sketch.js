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

  let offsetX = map(mouseX, 0, width, 20, -20);
  let offsetY = map(mouseY, 0, height, 20, -20);

  drawingContext.shadowOffsetX = offsetX;
  drawingContext.shadowOffsetY = offsetY;
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(207, 7, 70);
  rect(width/2, height/2, 300, 300, 30);
}
