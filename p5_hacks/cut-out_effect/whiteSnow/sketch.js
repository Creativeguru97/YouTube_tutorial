let layer1;
let font;
let bgImage;
let snows = [];

function preload(){
  font = loadFont('assets/KouzanMouhituFontOTF.otf');
  bgImage = loadImage('assets/snow.png');
}

function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  fill(21, 53, 92);

  layer1 = createGraphics(width*2/3, height*2/3);
  layer1.colorMode(HSB, 360, 100, 100, 100);
  layer1.rectMode(CENTER);
  layer1.fill(255);
  layer1.stroke(255);

  layer1.textFont(font);
  layer1.textAlign(CENTER, CENTER);

  layer1.imageMode(CENTER);

  for(let i = 0; i < 3; i++){
    let s = [];
    let numLimit = 12 - i*4;
    for(let j = 0; j < numLimit; j++){
      s.push(new Snow(8+14*i, 12+14*i));
    }
    snows.push(s);
    s = [];
  }

  pixelDensity(1);
}

function draw(){
  // background(207, 7, 99);
  image(bgImage, width/2, height/2);
  rect(mouseX, mouseY, 100, 100, 10);

  layer1.background(36, 36, 94);
  cutText(
    '白雪', layer1.width/2, layer1.height/2-55,
    256, 3, 100, 100
  );
  cutText(
    'Shira      yuki', layer1.width/2-10, layer1.height/2+85,
    48, 3, 100, 100
  );
  cutText(
    'White      snow', layer1.width/2-10, layer1.height/2+125,
    48, 3, 100, 100
  );

  for(let i = 0; i < snows.length; i++){
    for(let j = 0; j < snows[i].length; j++){
      snows[i][j].show(i*8, i*25);
      snows[i][j].descend();
      snows[i][j].reposition();
    }
  }

  image(layer1, width/2, height/2);
}

function cutText(theText, x, y, t_Size, s_Weight, f_A, s_A){
  layer1.stroke(255);
  layer1.strokeWeight(s_Weight);
  layer1.erase(f_A, s_A);
  layer1.textSize(t_Size);
  layer1.text(theText, x, y);
  layer1.noErase();
}

function glow(){
  drawingContext.shadowBlur = 48;
  drawingContext.shadowColor = color(207, 7, 99, 50);
}
