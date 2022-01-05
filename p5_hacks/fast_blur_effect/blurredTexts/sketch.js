function setup(){
  createCanvas(960, 540);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();

  textFont('Georgia');
  textAlign(CENTER, CENTER);
}

function draw(){
  background(36, 20, 94);
  textAnimation('Why', width/6+40, height/2.5, 0, width/6+30);
  textAnimation('we have', width/2-50, height/2.5, width/6-15, width/3+15);
  textAnimation('a cup of', width*3/4-10, height/2.5, width/3-15, width/2+15);
  textAnimation('coffee', width/4+12, height-height/2.5, width/2-15, width*2/3+15);
  textAnimation('during', width/2-5, height-height/2.5, width*2/3-15, width*5/6+15);
  textAnimation('coding', width*3/4-10, height-height/2.5, width*5/6-30, width);
}

function textAnimation(aText, x, y, aS, aE){
  let tSize = map(mouseX, aS, aE, 256, 72);
  let amount = map(mouseX, aS, aE, 48, 0);
  if(tSize < 72) tSize = 72;
  if(amount < 0) amount = 0;
  textSize(tSize);
  drawingContext.filter = 'blur('+str(amount)+'px)';
  let alpha = map(mouseX, aS, aE, 0, 100);
  fill(20, 76, 47, alpha);
  text(aText, x, y);
}
