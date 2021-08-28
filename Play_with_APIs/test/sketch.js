let graphics;

function setup(){
  createCanvas(700, 500, WEBGL);
  graphics = createGraphics(200, 200);
  graphics.fill(255);
  graphics.clear();
  graphics.text('information', 50, 50);
  // noStroke();
}

function draw(){
  orbitControl(4, 4);
  background(0);
  // ambientLight(100);

  texture(graphics);
  box(200);
}
