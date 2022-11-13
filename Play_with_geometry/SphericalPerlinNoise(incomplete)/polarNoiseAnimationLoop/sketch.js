const totalFrames = 480;
let counter = 0;

let particles = new Array(100);

function setup(){
  createCanvas(700, 700);
  // angleMode(DEGREES);
  colorMode(HSB);
  stroke(321, 38, 80);
  strokeWeight(3);
  noFill();

  for(let i = 0; i < particles.length; i++){
    particles[i] = new Particle();
  }
}

function draw(){
  background(230, 50, 15);
  let percent = (counter % totalFrames) / totalFrames;

  for(let p of particles){
    p.render(percent * TWO_PI);
  }
  // shadow();
  counter++;
}

// function polarPerlinNoiseLoop(){
//   let x = xNoise.value(a);
//   let y = yNoise.value(a);
//   ellipse(x, y, 100, 100);
// }

function shadow(){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = 'rgba(255, 255, 255)';
}
