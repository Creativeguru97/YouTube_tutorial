let r = 100;

function setup(){
  createCanvas(600, 600);
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
  balls();
}


function balls(){
  // let density = map(mouseX, 0, width, 360, 30);
  // if(density < 30) density = 30;

  let offset = map(mouseX, 0, width, 0, 360);

  for(let theta = 0+offset; theta < 360+offset; theta += 30){
    let ballX = r * cos(theta);
    let ballY = r * sin(theta);
    ellipse(ballX, ballY, 12, 12);
  }
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
