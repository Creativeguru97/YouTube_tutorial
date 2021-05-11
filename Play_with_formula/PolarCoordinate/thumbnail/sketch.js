let r = 100;


let pointLocation;
let locationStore;

function setup(){
  createCanvas(790, 790);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  strokeWeight(1);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  noFill();

  pointLocation = createVector(random(-width/2-20, width/2-20), random(-height/2-20, height/2-20));
  locationStore = pointLocation;
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  rose(290);
  // polarRoseExplain(80, 6);
}

function rose(radius){

  //x-axis
  drawingContext.setLineDash([2, 8]);
  line(-width/2+20, 0, width/2-20, 0);
  drawingContext.setLineDash([0, 0]);
  for(let x = -width/2+50; x <= width/2-50; x += 50){
    line(x, -5, x, 5);
  }
  //y-axis
  drawingContext.setLineDash([2, 8]);
  line(0, -height/2+20, 0, height/2-20);
  drawingContext.setLineDash([0, 0]);
  for(let y = -height/2+50; y <= height/2-50; y += 50){
    line(-5, y, 5, y);
  }

  //dots
  for(let r = 0; r < width/2-20; r+=50){
    for(let theta = 0; theta < 360; theta+=10){
      let x = r * cos(theta);
      let y = r * sin(theta);
      point(x, y);
    }
  }

  drawingContext.setLineDash([0, 0]);
  strokeWeight(5);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  beginShape();
  for(let theta = 0; theta < 360; theta += 1){
    let x = radius * cos(6*theta) * cos(theta);
    let y = radius * cos(5*theta) * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);

  strokeWeight(1);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
}

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
  strokeWeight(3);
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
  strokeWeight(1);

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
