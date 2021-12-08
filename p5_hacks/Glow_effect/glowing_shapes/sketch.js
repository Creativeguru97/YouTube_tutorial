function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);

  noFill();
  stroke(255);
  strokeWeight(20);
}

function draw(){
  background(230, 50, 15);

  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(207, 7, 99);
  rect(width/2, height/2, 300, 300, 30);
  // rect(width/2, height/2, 300, 300, 30);
  // rect(width/2, height/2, 300, 300, 30);
}
