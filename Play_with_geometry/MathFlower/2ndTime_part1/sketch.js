function setup(){
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(71, 26, 92);

  strokeWeight(4);
}

function draw(){
  background(75, 79, 51);
  // clear();
  orbitControl(4, 4);//3D mouse control

  rotateX(55);

  for(let theta = 0; theta < 60; theta += 1){
    beginShape(POINTS);
      for(let phi = 0; phi < 360; phi += 2){
        let r = (70*pow(abs(sin(phi*3)),1)+225)*theta/60;
        let x = r * cos(phi);
        let y = r * sin(phi);

        let z = vShape(350, r/100, 0.8, 0.15)-200 +
        perturbation(1.5, r/100, 12, phi);

        vertex(x, y, z);
      }
    endShape();
  }
}

function vShape(A, r, a, b){
  return A*pow(Math.E, -b * pow(abs(r), 1.5))*pow(abs(r), a);
}

function perturbation(A, r, p, angle){
  return 1 + A * pow(r, 2) * sin(p*angle);
}
