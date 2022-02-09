class Vapor{
  constructor(minR, maxR){
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(this.min_R, this.max_R);

    this.loc = createVector(
      random(layer1.width/2-20, layer1.width/2+20),
      random(-this.radius, layer1.height+this.radius)
    );
    this.velX = 0;
    this.velY = random(0.8, 1.5);
    noStroke();

    this.smokeAlpha = 100;
    this.offset = random(1000);
  }

  show(){
    layer1.drawingContext.filter = 'blur(20px)';
    layer1.erase(100, 100);
    layer1.noStroke();
    layer1.fill(255, this.smokeAlpha);
    layer1.ellipse(this.loc.x, this.loc.y, this.radius);
    layer1.noErase();
    layer1.drawingContext.filter = 'blur(0px)';
    if(this.loc.y < layer1.height*3/4) this.smokeAlpha -= 0.40;
  }

  ascend(){
    let n = map(noise(this.offset),0, 1, -0.70, 0.15);
    this.loc.x += n;
    this.loc.y -= this.velY;
    this.offset += 0.005;
  }

  reposition(){
    if(this.loc.y < -this.radius || this.smokeAlpha < 0){//this.loc.y < -this.radius ||
      this.changeRadius();
      this.loc.x = random(layer1.width/2-30, layer1.width/2+30);
      this.loc.y = layer1.height+this.radius;
      this.smokeAlpha = 100;
    }
  }

  changeRadius(){
    this.radius = random(this.min_R, this.max_R);
  }
}
