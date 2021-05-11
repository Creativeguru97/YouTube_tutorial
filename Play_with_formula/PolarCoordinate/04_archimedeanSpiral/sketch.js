
function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(3);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  noFill();
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  spiral();
}

function spiral(){
  // let angleMax = map(mouseX, 0, width, 180, 1080);
  let a = map(mouseX, 0, width, 0, 100);
  let b = map(mouseY, 0, height, 0.1, 0.3);

  beginShape();
  for(let theta = 0; theta < 1080; theta += 6){
    let x = (a+b*theta) * cos(theta);
    let y = (a+b*theta) * sin(theta);
    vertex(x, y);
  }
  endShape();
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
