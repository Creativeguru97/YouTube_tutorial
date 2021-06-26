let r;

function setup(){
  createCanvas(700, 700, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  // stroke(321, 0, 100);
  strokeWeight(2);
  noFill();

  r = width/4;
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control

  rotateX(65);
  for(let theta = 0; theta < 180; theta += 2){
    beginShape(POINTS);
    for(let phy = 0; phy < 360; phy += 2){
      let x = r*(1+0.2*sin(6*theta)*sin(5*phy)) * sin(1*theta) * cos(phy);
      let y = r*(1+0.2*sin(6*theta)*sin(5*phy)) * sin(1*theta) * sin(phy);
      let z = r*(1+0.2*sin(6*theta)*sin(5*phy)) * cos(1*theta);

      vertex(x, y, z);
    }
    endShape();
  }
}
