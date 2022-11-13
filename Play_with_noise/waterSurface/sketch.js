/*
For the people who didn't watch until end of the part 2 of the tutorial.
This sketch takes about 120~140 secs to finally draw the water surface animation.
Since it calculate a lot in the setup().
If you want to short the processing time, try change the frmLen value smaller.
like 90 or 60.
*/

const frmLen = 120;

let initPoints = [];
let points = [];
let wave = [];

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(12);

  randomSeed(70);
  for(let i = 0; i < 36; i++){
    initPoints.push(createVector(random(width), random(height)));
  }

  for(let f = 0; f < frmLen; f++){
    points.push([]);
    for(let i = 0; i < initPoints.length; i++){
      let pX = 50*sin(f*360/frmLen+6*initPoints[i].x)+initPoints[i].x;
      let pY = 50*cos(f*360/frmLen+6*initPoints[i].y)+initPoints[i].y;
      points[f].push(createVector(pX, pY));
    }
  }

  for(let f = 0; f < frmLen; f++){
    wave.push([]);
    for(let x = 0; x < width; x++){
      for(let y = 0; y < height; y++){
        let distances = [];
        for(let i = 0; i < points[f].length; i++){
          let d = (x-points[f][i].x)**2+(y-points[f][i].y)**2;
          distances[i] = d;
        }
        let sorted = sort(distances);
        let noise = Math.sqrt(sorted[0]);
        let index = (x + y * width)*4;

        //Daytime
        // wave[f][index+0] = waveColor(noise, 14.5, 44, 2.5);
        // wave[f][index+1] = waveColor(noise, 21, 169, 2.5);
        // wave[f][index+2] = waveColor(noise, 40, 225, 3.0);

        //Nighttime
        wave[f][index+0] = waveColor(noise, 40, 32, 2.2);
        wave[f][index+1] = waveColor(noise, 30, 55, 3.34);
        wave[f][index+2] = waveColor(noise, 30, 68, 3.55);

        // wave[f][index+0] = waveColor(noise, 30, 37, 3.77);
        // wave[f][index+1] = waveColor(noise, 30, 13, 3.62);
        // wave[f][index+2] = waveColor(noise, 30, 0, 3.23);

        // wave[f][index+0] = waveColor(noise, 30, 70, 3.6);
        // wave[f][index+1] = waveColor(noise, 30, 14, 3.21);
        // wave[f][index+2] = waveColor(noise, 30, 68, 3.22);

        // wave[f][index+0] = waveColor(noise, 29, 105, 3.13);
        // wave[f][index+1] = waveColor(noise, 30, 130, 3.17);
        // wave[f][index+2] = waveColor(noise, 30, 27, 3.06);
        wave[f][index+3] = 255;
      }
    }
    console.log('Generating frame data: '+str(f+1)+'/'+str(points.length));
  }
  pixelDensity(1);
}

function draw(){
  let frameIndex = frameCount % frmLen;

  loadPixels();
  for(let i = 0; i < wave[frameIndex].length; i+=4){
    pixels[i+0] = wave[frameIndex][i+0];
    pixels[i+1] = wave[frameIndex][i+1];
    pixels[i+2] = wave[frameIndex][i+2];
    pixels[i+3] = wave[frameIndex][i+3];
  }
  updatePixels();

  //Display feature points
  // beginShape(POINTS);
  // for(let i = 0; i < [i].length; i++){
  //   vertex(points[frameIndex][i].x, points[frameIndex][i].y);
  // }
  // endShape();
}

function waveColor(x, a, b, e){
  if(x < 0) return b;
  else return Math.pow(x/a, e)+b;
}
