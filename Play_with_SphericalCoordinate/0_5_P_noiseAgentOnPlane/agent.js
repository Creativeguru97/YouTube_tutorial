class Agent{

  constructor(){
    this.vector = createVector(random(width), random(height));
    this.vectorOld = createVector(this.vector.x, this.vector.y);
    this.stepSize = random(1, 3);
    this.isOutSide = false;
    this.angle;
  }

  update(noiseScale, noiseStrength){
    noiseScale = mouseX+10;

    this.angle = noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
    // noise(this.p.x / noiseScale, this.p.y / noiseScale) * noiseStrength;
    // console.log(this.angle);

    this.vector.x += cos(this.angle) * this.stepSize;
    this.vector.y += sin(this.angle) * this.stepSize;

    if(this.vector.x < -10){
      this.isOutSide = true;
    }else if(this.vector.x > width+10){
      this.isOutSide = true;
    }else if(this.vector.y < -10){
      this.isOutSide = true;
    }else if(this.vector.y > height+10){
      this.isOutSide = true;
    }

    if(this.isOutSide == true){
      this.vector.x = random(width);
      this.vector.y = random(height);
      this.vectorOld.set(this.vector);//Copying from p
    }


    strokeWeight(strokeWidth * this.stepSize);
    line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
    this.vectorOld.set(this.vector);//Copying from p

    this.isOutSide = false;

  }
}
