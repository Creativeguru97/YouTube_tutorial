function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(50);
}

function draw(){
  background(230, 30, 23);

  conicGradient(
    0, width/2, height/2,//Start angle, pX, pY
    [
      color(190, 100, 100, 100),
      color(100, 100, 100, 100),
      color(10, 100, 100, 100),
      color(280, 100, 100, 100)
    ]
  );
  ellipse(width/2, height/2, 400, 400);
  shadow();
}

function conicGradient(sA, sX, sY, colors){
  let gradient = drawingContext.createConicGradient(
    sA, sX, sY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[0]);

  drawingContext.strokeStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
