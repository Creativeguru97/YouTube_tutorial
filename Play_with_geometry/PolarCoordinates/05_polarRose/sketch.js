let r = 480;
let offset = 0;
let offsetStore = offset;

function setup(){
  createCanvas(1000, 1000);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(20);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  noFill();
  pixelDensity(1);
}

function draw(){
  // background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  clear();
  translate(width/2, height/2);

  // shadow();
  // rose();
  rose2();
  // madnessOfPattern();
  // polarRoseExplain(80, 6);

}

function keyTyped(){
  if(key == "s") saveFrames("thumbnail", 'png', 1, 1);
}

function rose(){
  let d = map(mouseX, 0, width, 0, 10);
  let n = map(mouseY, 0, height, 0, 10);
  beginShape();
  for(let theta = 0; theta < 1800; theta += 1){
    let x = r * cos(n/d*theta) * cos(theta);
    let y = r * cos(n/d*theta) * sin(theta);
    vertex(x, y);
  }
  endShape();
}

function rose2(){
  let offset = map(mouseX, 0, width, -150, 150);
  beginShape();
  for(let theta = 0; theta < 360; theta += 0.5){
    // let x = (r * cos(10*theta)+offset) * cos(theta);
    // let y = (r * cos(10*theta)+offset) * sin(theta);
    let x = (r * cos(6*theta)) * cos(theta);
    let y = (r * cos(5*theta)) * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function madnessOfPattern(){
  let angleMax = map(mouseX, 0, width, 0, 360);

  beginShape();
  for(let theta = 0; theta < 720; theta += 0.2){
    let x = r*cos(9*theta) * pow(cos(theta), 2);
    let y = r*tan(2*theta) * pow(sin(theta), 2);
    vertex(x, y);
  }
  endShape();
}

//Set the strokeWeight(1 ~ 2)
function polarRoseExplain(radius, freq){
  if(mouseIsPressed){
    offset = map(mouseX, 0, width, 160, -160);
    offsetStore = offset;
  }else{
    offset = offsetStore;
  }

  // Draw Cartesian coordinate
  drawingContext.setLineDash([0, 0]);
  line(60, 0, width/2, 0);//x-axis
  line(180+width/10, height/2.4, 180+width/10, -height/2.2);//y-axis
  text("0", -12+width/10+180, 15);//centre
  text("π", 345+width/10, 15);//centre
  text("- π", -20+width/10, 15);//centre

  drawingContext.setLineDash([1, 8]);
  line(-width/2, -radius+offset, width/2, -radius+offset);
  line(-width/2, radius+offset, width/2, radius+offset);
  line(360+width/10, height/2.4, 360+width/10, -height/2.2);
  line(width/10, height/2.4, width/10, -height/2.2);

  let cosHeight = map(offset, -160, 160, 3, -1);
  drawingContext.setLineDash([0, 0]);
  text(nf(cosHeight, 1, 1), -15+width/10, -radius+offset);
  text(nf(cosHeight-2, 1, 1), -15+width/10, radius+offset);

  // Draw Polar coordinate
  line(40, 0, -width/2, 0);//x-axis
  line(-width/4, height/2.4, -width/4, -height/2.2);//y-axis
  text("0", -width/4-12, 15);//centre

  drawingContext.setLineDash([1, 8]);
  ellipse(-width/4, 0, (-radius+offset)*2);
  ellipse(-width/4, 0, (radius+offset)*2);

  drawingContext.setLineDash([0, 0]);
  //Draw polar rose
  beginShape();
  for(let theta = 0; theta < 360; theta += 1){
    let x = (radius * cos(freq*theta)+offset) * cos(theta)-width/4;
    let y = (radius * cos(freq*theta)+offset) * sin(theta);
    vertex(x, y);
  }
  endShape();

  //Draw cosine wave
  beginShape();
  for(let theta = 0; theta <= 360; theta += 1){
    waveX = theta + width/10;
    waveY = radius * cos(theta * freq)+offset;
    vertex(waveX, waveY);
  }
  endShape();

  textFont('Helvetica Neue', 16);
  text("y = sin(6x) + (" + str(nf(cosHeight-1.0, 1, 1)) + ")", width/4+12, height/2-10);//centre
  text("r = sin(6θ) + (" + str(nf(cosHeight-1.0, 1, 1)) + ")", -width/4-12, height/2-10);//centre
  textSize(12);
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
