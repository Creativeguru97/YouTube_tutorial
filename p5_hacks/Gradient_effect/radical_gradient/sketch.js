function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw(){
  background(230, 30, 23);

  radialGradient(
    width/2-40, height/2-120, 0,//Start pX, pY, start circle radius
    width/2-40, height/2-120, 380,//End pX, pY, End circle radius
    color(190, 100, 100, 100), //Start color
    color(310, 100, 100, 100), //End color
  );
  ellipse(width/2, height/2, 400, 400);
  // shadow();
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE){
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);

  drawingContext.fillStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
