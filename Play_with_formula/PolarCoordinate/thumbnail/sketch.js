let r = 100;


let pointLocation;
let locationStore;

function setup(){
  createCanvas(800, 800);
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
}

function keyTyped(){
  if(key === 's') saveCanvas('thumbnail', 'png');
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
  strokeWeight(3);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  beginShape();


  for(let theta = 0; theta < 360; theta += 0.2){
    let x = radius * cos(6*theta) * pow(cos(theta*5), 1);
    let y = radius * cos(5*theta) * pow(sin(theta*5), 1);
    vertex(x, y);
  }
  endShape();

  strokeWeight(1);
  stroke(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
