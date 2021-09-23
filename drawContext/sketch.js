function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
}

function draw(){
  background(0);
  // gradientShape1();
  gradientShape2();
  // shadow();
}

function gradientShape1(){
  // fill(255);
  noStroke();

  let gradient = drawingContext.createRadialGradient(
    width/2, height/2, 0, width/2, height/2, 150
  )
  gradient.addColorStop(0, color(180, 100, 100, 0));
  gradient.addColorStop(0.5, color(220, 100, 100, 50));
  gradient.addColorStop(1, color(290, 100, 100, 100));

  drawingContext.fillStyle = gradient;

  ellipse(width/2, height/2, 300, 300);
}

function gradientShape2(){
  translate(width/2, height/2);
  noFill(255);
  strokeWeight(100);


  let gradient = drawingContext.createRadialGradient(
    0, 0, 100, 0, 0, 150
  )
  gradient.addColorStop(0, color(180, 100, 100, 0));
  // gradient.addColorStop(0.5, color(150, 100, 100, 100));
  gradient.addColorStop(1, color(190, 100, 100, 100));

  drawingContext.strokeStyle = gradient;

  beginShape();
    for(i=0; i<360; i+=30){
      let x = 150 * cos(i);
      let y = 150 * sin(i);
      vertex(x, y);
    }
  endShape(CLOSE);
}

function shadow(){
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = 'rgba(255, 255, 255, 100)';
}
