let r = 200;
let noiseScale = 0;
let noiseOffset = 0;

let cols = 50;
let rows = 50;
let verticies = [];

let noiseMode;

let canvas;

function setup(){
  canvas = createCanvas(800, 800, WEBGL);//size(600, 400);
  canvas.id('canvas');
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  for(let theta = 0; theta < rows; theta++){
    verticies[theta] = [];
    for(let phi = 0; phi < cols; phi++){
      verticies[theta][phi] = 0;
    }
  }

  noiseMode = createSelect();
  noiseMode.option("mode 1");
  noiseMode.option("mode 2");
  noiseMode.class("Selector");
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control

  noStroke();
  rotateX(65);
  noiseTexture();
}

function noiseTexture(){
  for(let theta = 0; theta < rows; theta++){
    verticies[theta] = [];
    for(let phi = 0; phi < cols; phi++){
      let noiseX = map(sin(theta*180/rows)*cos(phi*360/cols), -1, 1, 0, 4);
      let noiseY = map(sin(theta*180/rows)*sin(phi*360/cols), -1, 1, 0, 4);
      let noiseZ = map(cos(theta*180/rows), -1, 1, 0, 4);

      let pos = createVector(
        r * sin(theta*180/rows) * cos(phi*360/cols),
        r * sin(theta*180/rows) * sin(phi*360/cols),
        r * cos(theta*180/rows)
      );

      let hue = 0;
      if(noiseMode.value() == "mode 1"){
        hue = map(noise(noiseX+noiseOffset, noiseY, noiseZ), 0, 1, 160, 340);//Earth like
        // hue = map(noise(noiseX+noiseOffset, noiseY, noiseZ), 0, 1, 30, 50);//venus like
        // hue = map(noise(noiseX+noiseOffset, noiseY, noiseZ), 0, 1, 20, 35);//Mars like
      }else if (noiseMode.value() == "mode 2") {
        let n = map(noise(noiseX+noiseOffset, noiseY, noiseZ), 0, 1, 0, 24);
        hue = map((n - int(n)), 0, 1, 170, 260);
      }

      verticies[theta][phi] = [pos, hue];
    }
  }

  for(let theta = 0; theta < verticies.length; theta++){
    for(let phi = 0; phi < verticies[theta].length; phi++){

      if(noiseMode.value() == "mode 1"){
        fill(verticies[theta][phi][1], 100, 100);
      }else if (noiseMode.value() == "mode 2") {
        fill(verticies[theta][phi][1], 100, 100);
      }

      if(theta < verticies.length-1 && phi < verticies[theta].length-1){
        beginShape();
        vertex(verticies[theta][phi][0].x, verticies[theta][phi][0].y, verticies[theta][phi][0].z,);
        vertex(verticies[theta+1][phi][0].x, verticies[theta+1][phi][0].y, verticies[theta+1][phi][0].z,);
        vertex(verticies[theta+1][phi+1][0].x, verticies[theta+1][phi+1][0].y, verticies[theta+1][phi+1][0].z,);
        vertex(verticies[theta][phi+1][0].x, verticies[theta][phi+1][0].y, verticies[theta][phi+1][0].z,);
        endShape(CLOSE);
      }else if(theta < verticies.length-1 && phi == verticies[theta].length-1){
        beginShape();
        vertex(verticies[theta][phi][0].x, verticies[theta][phi][0].y, verticies[theta][phi][0].z,);
        vertex(verticies[theta][0][0].x, verticies[theta][0][0].y, verticies[theta][0][0].z,);
        vertex(verticies[theta+1][0][0].x, verticies[theta+1][0][0].y, verticies[theta+1][0][0].z,);
        vertex(verticies[theta+1][phi][0].x, verticies[theta+1][phi][0].y, verticies[theta+1][phi][0].z,);
        endShape(CLOSE);
      }else if(theta = verticies.length-1){
        beginShape();
        for(let i=0; i<=phi; i++){
          vertex(verticies[theta][i][0].x, verticies[theta][i][0].y, verticies[theta][i][0].z);
        }
        endShape(CLOSE);
      }

    }
  }
  noiseOffset-=0.005;
}
