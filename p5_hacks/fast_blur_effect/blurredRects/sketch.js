function setup(){
  createCanvas(800, 600);
  rectMode(CENTER);
  stroke(237, 228, 204);
  fill(179, 179, 96);
  strokeWeight(24);
}

function draw(){
  background(173, 123, 78);
  translate(width/2, height/2);

  rotate(millis()/1000);
  rect(0, 0, 400, 400, 40);
  drawingContext.filter = 'blur(8px)';

  console.log('Frame rate: '+frameRate());
}
