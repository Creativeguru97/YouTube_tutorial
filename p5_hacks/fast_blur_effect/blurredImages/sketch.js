let sapa;
let rainDrop;

function preload(){
  sapa = loadImage('assets/sapa.png');
  rainDrop = loadImage('assets/rainDrops4.png');
}

function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);
  imageMode(CENTER);
}

function draw(){
  background(0);
  let amount = map(mouseX, 0, width, 1, 12);
  if(amount < 0) amount = 0;
  drawingContext.filter = 'blur('+str(amount)+'px)';
  image(sapa, width/2, height/2);

  let amount2 = map(mouseX, 0, width, 12, 1);
  if(amount2 < 0) amount2 = 0;
  drawingContext.filter = 'blur('+str(amount2)+'px)';
  image(rainDrop, width/2, height/2);
}
