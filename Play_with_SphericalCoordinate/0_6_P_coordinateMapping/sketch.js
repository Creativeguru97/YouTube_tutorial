function setup(){
  createCanvas(400, 400);
  angleMode(DEGREES);

  stroke(255);
  strokeWeight(1);
  fill(255, 50);//fill(R, G, B, Alpha); / fill(RGB, Alpha);
}

function draw(){
  background(0);
  translate(width/2, height/2);
  // translate(0, height/2);

  beginShape();
  for(let angle = 0; angle < 360; angle += 1){
    let theta = angle;
    let r = (sin(6*theta)*100);

    let x = r * cos(theta);
    let y = r * sin(theta);

    // let x = angle;
    // let y = (sin(6*x)*50)-90;
    vertex(x, y);
  }
  endShape();

}


function keyReleased(){
}

function keyPressed(){
}
