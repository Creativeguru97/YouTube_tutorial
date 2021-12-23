function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);

  noStroke();
  // strokeWeight(30);
  // noFill();
}

function draw(){
  background(230, 30, 23);

  linearGradient(
    width/2-200, height/2-200, //Start point
    width/2+200, height/2+200, //End point
    color(310, 100, 100, 100), //Start color
    color(250, 100, 100, 100), //End color
  );
  rect(width/2, height/2, 400, 400, 50);
  shadow();
}

function linearGradient(sX, sY, eX, eY, colorS, colorE){
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  // drawingContext.strokeStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 14;
  drawingContext.shadowOffsetY = 14;
  drawingContext.shadowBlur = 14;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
