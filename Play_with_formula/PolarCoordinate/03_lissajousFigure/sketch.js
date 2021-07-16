let theta;
let offset = 1;

let sineComponent;
let cosineComponent;

function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  noFill();
  stroke(32, 18, 99, 100);
  strokeWeight(1);

  sineComponent = new LissajousComponent(-width/4, height/4, 0, 0, 150, 0);
  cosineComponent = new LissajousComponent(width/4, -height/4, 0, 0, 150, 0);
}

function draw(){
  frameRate(30);
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  lissajous(200);
  // lissajousExplain(150, width/4, height/4);
}

function lissajous(radius){
  let freqX = map(mouseX, 0, width, 1, 10);
  let freqY = map(mouseY, 0, height, 1, 10);
  let offset = map(mouseX, 0, width, 1, 180);

  beginShape();
  for(let theta = 0; theta < 360; theta += 1){
    let x = radius * cos(theta*freqX);
    let y = radius * sin(theta*freqY);
    vertex(x, y);
  }
  endShape();
}

function lissajousExplain(radius, translateX, translateY){
  let freqCosine = 1;
  let freqSine = 3;

  cosineComponent.displayCircle(freqCosine);
  cosineComponent.displayWave("cosine", freqCosine);
  sineComponent.displayCircle(freqSine);
  sineComponent.displayWave("sine", freqSine);

  beginShape();
  strokeWeight(1);
  for(let theta = 0; theta < 360; theta += 1){
    let x = radius * cos(theta * freqCosine)+translateX;
    let y = radius * sin(theta * freqSine)+translateY;
    vertex(x, y);
  }
  endShape(CLOSE);

  strokeWeight(5);
  point(cosineComponent.pointX, sineComponent.pointY);
  strokeWeight(1);
  drawingContext.setLineDash([1, 4]);
  line(cosineComponent.pointX, sineComponent.pointY, sineComponent.pointX, sineComponent.pointY);
  line(cosineComponent.pointX, sineComponent.pointY, cosineComponent.pointX, cosineComponent.pointY);
  drawingContext.setLineDash([0, 0]);
}


class LissajousComponent{
  constructor(translateX, translateY, x, y, r, theta){
    this.pointX;
    this.pointY;
    this.waveX;
    this.waveY;

    this.r = r;
    this.theta = theta;
    this.translateX = translateX;
    this.translateY = translateY;
  }

  displayCircle(offset){
    strokeWeight(1);
    ellipse(this.translateX, this.translateY, this.r*2);

    this.pointX = this.r * cos(this.theta)+this.translateX;
    this.pointY = this.r * sin(this.theta)+this.translateY;
    strokeWeight(5);
    point(this.pointX, this.pointY);
    this.theta += offset*2;
  }

  displayWave(waveType, freq){
    strokeWeight(1);
    drawingContext.setLineDash([3, 5]);

    beginShape();
    if(waveType == "sine"){
      for(let i = 0; i < this.r*2; i += 1){
        theta = i + offset;
        this.waveX = i - this.r + this.translateX;
        this.waveY = this.r * sin(theta * freq) + this.translateY;
        vertex(this.waveX, this.waveY);
      }
    }else if(waveType == "cosine"){
      for(let i = 0; i < this.r*2; i += 1){
        theta = i + offset;
        // this.waveX = i - r + this.translateX;
        // this.waveY = r * cos(theta * freq) + this.translateY;
        this.waveX = this.r * cos(theta * freq) + this.translateX;
        this.waveY = i - this.r + this.translateY;
        vertex(this.waveX, this.waveY);
      }
    }
    offset++;
    endShape();

    drawingContext.setLineDash([0, 0]);
  }


}



function shadow(){
  drawingContext.shadowOffsetX = 3;
  drawingContext.shadowOffsetY = -3;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
