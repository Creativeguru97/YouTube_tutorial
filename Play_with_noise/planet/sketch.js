let rows = 60;
let cols = 120;

let vertices = [];
let solar;

let starPos = [];

function preload(){
  solar = loadImage("solar.png");
}

function setup(){
  createCanvas(960, 540, WEBGL);//size(600, 400);
  perspective(PI/3.0, width/height, 0.1, 15000);//(perspective ,aspect ratio, rendering range)

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  imageMode(CENTER);
  noStroke();

  for(theta = 0; theta < rows; theta++){
    vertices.push([]);
    for(phi = 0; phi < cols; phi++){
      let noiseX = map(sin(theta*180/rows) * cos(phi*360/cols), -1, 1, 0, 5);
      let noiseY = map(cos(theta*180/rows), -1, 1, 0, 5);
      let noiseZ = map(sin(theta*180/rows) * sin(phi*360/cols), -1, 1, 0, 5);

      //Planet 1
      let hue = map(noise(noiseX, noiseY, noiseZ), 0, 1, 150, 340);
      //Planet 2
      // let saturation = map(noise(noiseX, noiseY, noiseZ), 0, 1, 5, 55);
      //Planet 3
      // let n = map(noise(noiseX, noiseY, noiseZ), 0, 1, 0, 16);
      // let hue = map(n-int(n), 0, 1, 33, 35);
      // let brightness = map(n-int(n), 0, 1, 97, 100);

      // let n = map(noise(noiseX, noiseY, noiseZ), 0, 1, 0, 1.75);
      // let hue = map((n - int(n)), 0, 1, 150, 260);
      // let brightness = map((n - int(n)), 0, 1, 20, 100);

      let pos = createVector(
        200 * sin(theta*180/rows) * cos(phi*360/cols),
        200 * cos(theta*180/rows),
        200 * sin(theta*180/rows) * sin(phi*360/cols)
      );

      // vertices[theta].push([pos, hue]);//Planet 1
      // vertices[theta].push([pos, saturation]);//Planet 2
      vertices[theta].push([pos, hue, brightness]);//Planet 3, 4
    }
  }

  for(let i=0; i<1000; i++){
    let theta = random(180);
    let phi = random(360);
    let pos = createVector(
      3500 * sin(theta) * cos(phi),
      3500 * cos(theta),
      3500 * sin(theta) * sin(phi)
    );
    let brightness = random(30, 60);
    starPos.push([pos, brightness]);
  }
}

function draw(){
  clear();//Make a tranparent background
  orbitControl(4, 4);//3D Mouse control
  rotateZ(-20);
  rotateX(-15);
  rotateY(-130);

  stars();
  theSolar();
  planet();
}

function planet(){
  for(theta = 0; theta < vertices.length; theta++){
    for(phi = 0; phi < vertices[theta].length; phi++){

      fill(vertices[theta][phi][1], 100, 100);//Planet1
      // fill(210, vertices[theta][phi][1], 100);//Planet2
      // fill(vertices[theta][phi][1], 100, vertices[theta][phi][2]);//Planet3, 4

      if(theta < vertices.length-1 && phi < vertices[theta].length-1){
        beginShape();
        vertex(vertices[theta][phi][0].x, vertices[theta][phi][0].y, vertices[theta][phi][0].z);
        vertex(vertices[theta+1][phi][0].x, vertices[theta+1][phi][0].y, vertices[theta+1][phi][0].z);
        vertex(vertices[theta+1][phi+1][0].x, vertices[theta+1][phi+1][0].y, vertices[theta+1][phi+1][0].z);
        vertex(vertices[theta][phi+1][0].x, vertices[theta][phi+1][0].y, vertices[theta][phi+1][0].z);
        endShape(CLOSE);
      }else if(theta < vertices.length-1 && phi == vertices[theta].length-1){
        beginShape();
        vertex(vertices[theta][phi][0].x, vertices[theta][phi][0].y, vertices[theta][phi][0].z);
        vertex(vertices[theta][0][0].x, vertices[theta][0][0].y, vertices[theta][0][0].z);
        vertex(vertices[theta+1][0][0].x, vertices[theta+1][0][0].y, vertices[theta+1][0][0].z);
        vertex(vertices[theta+1][phi][0].x, vertices[theta+1][phi][0].y, vertices[theta+1][phi][0].z);
        endShape(CLOSE);
      }else if(theta == vertices.length-1){
        beginShape();
        for(let i = 0; i < phi; i++){
          vertex(vertices[theta][i][0].x, vertices[theta][i][0].y, vertices[theta][i][0].z);
        }
        endShape(CLOSE);
      }
    }
  }
}

function theSolar(){
  push();
  translate(0, 0, -3000);
  image(solar, 0, 0, 6400*6, 3556*6);
  pop();

  pointLight(
    0, 0, 100,
    0, 0, 0
  );
}

function stars(){
  push();
  strokeWeight(3);

  beginShape(POINTS);
  for(let i=0; i<starPos.length; i++){
    stroke(0, 0, starPos[i][1]);
    vertex(
      starPos[i][0].x,
      starPos[i][0].y,
      starPos[i][0].z
    );
  }
  endShape();
  pop();
}
