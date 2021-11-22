//I use Chrome since p5.AudioIn is not supported on Safari and iOS.
let song;
let bgImg;
let button;
let fft;

let canvas;
let soundObject;

function preload(){
  // song = loadSound("songs/Tomasz Bednarczyk-Mizuame(Sawako Sun).mp3");
  song = loadSound("songs/William Ross Chernoff's Nomads-Ahmad.mp3");
  // song = loadSound("songs/The_Columbians_-_Just_Like_A_Rainbow.mp3");
  // song = loadSound("songs/JoeyPecoraro-YourFavoritePlace.mp3");
  // song = loadSound("songs/JoeyPecoraro-CurlUpIntoABall.mp3");
  // song = loadSound("songs/JoeyPecoraro-TobeHappy.mp3");
  bgImg = loadImage("images/backgroundMedium.png");
}

function setup(){
  canvas = createCanvas(1270, 720);
  canvas.id('canvas');
  angleMode(DEGREES);

  soundObject = new Wave();

  button = createButton("play");
  button.mousePressed(togglePlaying);
  button.id('button');

  fft = new p5.FFT(0.3, 512);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(8);
  stroke(210, 0, 100, 75);
  fill(210, 0, 100, 10);
  // noFill();
  imageMode(CENTER);
}

function draw(){
  background(0);

  let spectrum = fft.analyze();
  translate(width/2, height/2);
  image(bgImg, 0, 0);

  shadow();
  soundObject.display(spectrum);
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

function keyTyped(){
  if(key === 's') saveCanvas('thumbnail', 'png');
}

function shadow(){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 14;
  drawingContext.shadowColor = 'rgba(255, 255, 255)';
}
