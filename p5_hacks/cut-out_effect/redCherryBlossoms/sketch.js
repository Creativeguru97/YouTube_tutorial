let layer2;
let bgImage;
let font;
let petals = [];
let s = [];

function preload(){
  bgImage = loadImage('assets/blossom.png');
  font = loadFont('assets/KouzanMouhituFontOTF.otf');
}

function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);

  rectMode(CENTER);
  textSize(128);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  stroke(71, 53, 86);
  strokeWeight(5);
  fill(71, 53, 86);

  layer2 = createGraphics(640, 360);
  layer2.colorMode(HSB, 360, 100, 100, 100);
  layer2.rectMode(CENTER);

  layer2.fill(255);
  layer2.stroke(255);

  layer2.textFont(font);
  layer2.textAlign(CENTER, CENTER);
  layer2.imageMode(CENTER);

  for(let i = 0; i < 3; i++){
    let num = 6 - i * 2;
    for(let j = 0; j < num; j++){
      s.push(new Petal(3+5*i, 5+6*i));
    }
    petals.push(s);
    s = [];
  }
}

function draw(){
  image(bgImage, width/2, height/2);
  layer2.background(347, 6, 99);//359, 34, 95

  layer2.erase();
  layer2.textSize(256);
  layer2.strokeWeight(3);
  layer2.text('紅桜', layer2.width/2, layer2.height/2-55);

  layer2.textSize(48);
  layer2.text(
    'Beni      zakura',
    layer2.width/2, layer2.height/2+85
  );

  layer2.textSize(32);
  layer2.text(
    'Red        cherry blossoms',
    layer2.width/2+35, layer2.height/2+125
  );
  layer2.noErase();

  for(let i = 0; i < petals.length; i++){
    for(let j = 0; j < petals[i].length; j++){
      petals[i][j].show(i*5, i*35);
      petals[i][j].descend();
      petals[i][j].reinitialize();
    }
  }

  image(layer2, width/2, height/2);
}
