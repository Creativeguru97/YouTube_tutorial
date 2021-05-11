let r = 100;

function setup(){
  createCanvas(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  stroke(32, 18, 99, 100);
  strokeWeight(1);
  fill(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  polygon();
}

function polygon(){
  num = map(mouseX, 0, width, 180, 30);
  if(num < 30) num = 30;

  beginShape();
  for(let angle = 0; angle < 360; angle += num){
    theta = angle;
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 120;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
