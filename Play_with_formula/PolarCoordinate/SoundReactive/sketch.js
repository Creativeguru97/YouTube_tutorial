//I use Chrome since p5.AudioIn is not supported on Safari and iOS.
let song;
let bgImg;
let button;
let fft;
let bg;
let oscTheta = -90;

function preload(){
  // song = loadSound("songs/Tomasz Bednarczyk-Mizuame(Sawako Sun).mp3");
  // song = loadSound("songs/William Ross Chernoff's Nomads-Ahmad.mp3");
  // song = loadSound("songs/The_Columbians_-_Just_Like_A_Rainbow.mp3");
  // song = loadSound("songs/JoeyPecoraro-YourFavoritePlace.mp3");
  song = loadSound("songs/JoeyPecoraro-CurlUpIntoABall.mp3");
  // song = loadSound("songs/JoeyPecoraro-TobeHappy.mp3");
  bgImg = loadImage("images/background.png");
}

function setup(){
  createCanvas(1920, 1080);
  angleMode(DEGREES);

  // button = createButton("play");
  // button.mousePressed(togglePlaying);
  song.loop();
  fft = new p5.FFT(0.5, 512);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(6);
  stroke(210, 0, 100, 75);
  fill(210, 0, 100, 10);
  imageMode(CENTER);
}

function draw(){
  bg = background(0);

  let spectrum = fft.analyze();
  translate(width/2, height/2);
  image(bgImg, 0, 0);

  wave(spectrum);
  shadow();
}

function wave(spectrum){
  let angleOffset = 180*cos(oscTheta);
  beginShape();
  for(let i = 0; i < spectrum.length*2; i++){
    let theta = map(i, 0, spectrum.length*2-1, 0+angleOffset, 360+angleOffset);

    let amp = 0;
    if (i < spectrum.length) {
      amp = spectrum[i];
    }else if (i >= spectrum.length && i < spectrum.length*2) {
      let index = int(map(i, spectrum.length, spectrum.length*2-1, spectrum.length-1, 0));
      amp = spectrum[index];
    }

    r = map(amp, 0, 256, width/7, width/6);
    let x = (r*cos(theta*6)+0) * cos(theta*1);
    let y = (r*cos(theta*5)+0) * sin(theta*1);
    // let x = r * cos(theta*1-90);
    // let y = r * sin(theta*1-90);
    // line(x*0.9, y*0.9, x, y);

    vertex(x, y);
  }
  endShape(CLOSE);

  oscTheta+=0.1;
}


function togglePlaying(){
  if(!song.isPlaying()){
    song.loop();
    button.html("pause");
  }else{
    song.pause();
    button.html("play");
  }
}

function shadow(){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 22;
  drawingContext.shadowColor = 'rgba(255, 255, 255)';
}
