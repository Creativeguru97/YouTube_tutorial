let marbles = [];

function setup(){
  createCanvas(960, 540);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  for(let i = 0; i < 3; i++){
    let m = [];
    let numLimit = 18 - i*7;
    for(let j = 0; j < numLimit; j++){
      m.push(new Marble(30+50*i, 50+55*i, 20-i*10));
    }
    marbles.push(m);
    m = [];
  }
}

function draw(){
  background(24, 61, 25);

  for(let i = 0; i < marbles.length; i++){
    for(let j = 0; j < marbles[i].length; j++){
      marbles[i][j].show(marbles.length*3 - i*4);
      marbles[i][j].ascend();
      marbles[i][j].reposition();
    }
  }
  console.log('Frame rate: '+frameRate());
}
