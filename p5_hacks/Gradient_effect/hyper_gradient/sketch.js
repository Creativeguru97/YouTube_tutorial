function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  // noStroke();
  strokeWeight(70);
  noFill();
}

function draw(){
  background(230, 30, 23);
  hyperGradient3();
  // shadow();
}

function hyperGradient1(){
  radialGradient(
    250, 250, 0,//Start pX, pY, start circle radius
    250, 250, 250,//End pX, pY, End circle radius
    color(190, 100, 100, 100), //Start color
    color(0, 100, 0, 0), //End color
  );
  ellipse(width/2, height/2, 400, 400);

  radialGradient(
    width-250, 250, 0,//Start pX, pY, start circle radius
    width-250, 250, 250,//End pX, pY, End circle radius
    color(250, 100, 100, 100), //Start color
    color(0, 100, 0, 0), //End color
  );
  ellipse(width/2, height/2, 400, 400);

  radialGradient(
    width-250, height-250, 0,//Start pX, pY, start circle radius
    width-250, height-250, 250,//End pX, pY, End circle radius
    color(280, 100, 100, 100), //Start color
    color(0, 100, 0, 0), //End color
  );
  ellipse(width/2, height/2, 400, 400);

  radialGradient(
    250, height-250, 0,//Start pX, pY, start circle radius
    250, height-250, 250,//End pX, pY, End circle radius
    color(40, 100, 100, 100), //Start color
    color(0, 100, 0, 0), //End color
  );
  ellipse(width/2, height/2, 400, 400);
}

function hyperGradient2(){
  linearGradient(
    width/2, 200,//Start pX, pY, start circle radius
    width/2, height-200,//End pX, pY, End circle radius
    color(30, 50, 100, 100), //Start color
    color(270, 100, 40, 100), //End color
  );
  ellipse(width/2, height/2, 400, 400);

  radialGradient(
    width-100, 100, 0,//Start pX, pY, start circle radius
    width-100, 100, 550,//End pX, pY, End circle radius
    color(190, 100, 100, 100), //Start color
    color(0, 0, 0, 0), //End color
  );
  ellipse(width/2, height/2, 400, 400);
}

function hyperGradient3(){
  conicGradient(
    0, width/2, height/2,//Start angle, pX, pY
    [
      color(190, 100, 100, 100),
      color(100, 100, 100, 100),
      color(10, 100, 100, 100),
      color(280, 100, 100, 100),
      color(190, 100, 100, 100)
    ]
  );
  ellipse(width/2, height/2, 400, 400);

  radialGradient(
    width/2, height/2, 160,//Start pX, pY, start circle radius
    width/2, height/2, 260,//End pX, pY, End circle radius
    color(0, 0, 100, 100), //Start color
    color(0, 0, 0, 0), //End color
  );
  ellipse(width/2, height/2, 400, 400);
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

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE){
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  // drawingContext.fillStyle = gradient;
  drawingContext.strokeStyle = gradient;
}

function conicGradient(sA, sX, sY, colors){
  let gradient = drawingContext.createConicGradient(
    sA, sX, sY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[4]);

  drawingContext.strokeStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
