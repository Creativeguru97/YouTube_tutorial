class Wave{
  constructor(){
    this.oscTheta = -90;
    this.angleRangeOffset = 0;
    this.thetaMult = 1;
    this.xrThetaMult = 6;
    this.yrThetaMult = 6;
    this.exponent = 1;
    this.r = width/5;
    this.mappedR = 0;
    this.rOffset = width/5;
    this.ripple = 0;

    this.frame = 0;
    this.currentFrame = 0;
  }

  display(spectrum){

    this.angleRangeOffset = 180*cos(this.oscTheta);

    beginShape();
    for(let i = 0; i < spectrum.length*2; i++){
      let theta = map(i, 0, spectrum.length*2-1, 0+this.angleRangeOffset, 360+this.angleRangeOffset);

      let amp = 0;
      if (i < spectrum.length) {
        amp = spectrum[i];
      }else if (i >= spectrum.length && i < spectrum.length*2) {
        let index = int(map(i, spectrum.length, spectrum.length*2-1, spectrum.length-1, 0));
        amp = spectrum[index];
      }

      this.ripple = map(amp, 0, 256, 0, width/30);
      this.mappedR = this.r - this.rOffset;

      let x = (this.mappedR*cos(theta*this.xrThetaMult)+this.rOffset+this.ripple) * pow(cos(theta*this.thetaMult), this.exponent);
      let y = (this.mappedR*cos(theta*this.yrThetaMult)+this.rOffset+this.ripple) * pow(sin(theta*this.thetaMult), this.exponent);

      vertex(x, y);
    }
    endShape();

    if(song.isPlaying()){
      this.rOffset = this.animation(
        [this.r, this.r, this.r, this.r*3/4, this.r/2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.r],
        -80,
        320,
        true
      );

      this.xrThetaMult = this.animation(
        [6, 6, 6, 6, 6, 6, 6, 5, 4, 6, 6, 6, 12, 11,  9,  6,  4,  7, 10, 13, 8, 7, 7, 7, 6],
        -80,
        320,
        true
      );

      this.yrThetaMult = this.animation(
        [6, 6, 6, 6, 6, 6, 6, 5, 4, 6, 5, 4, 11, 13, 13, 12, 11,  9,  6,  4, 4, 2, 4, 6, 6],
        -80,
        320,
        true
      );
    }
    // console.log(this.yrThetaMult);

    this.oscTheta+=0.1;
  }

  animation(keyFrames, startOffset, aOffset, isLoop){ //e.g. : ([100, -50, 100], 0, 80, 1)
    let sequenceLength = -startOffset+aOffset*keyFrames.length;
    if(isLoop == true){
      this.currentFrame = this.frame % sequenceLength;
    }else if (isLoop == false) {
      this.currentFrame = this.frame;
    }

    let value = 0;
    for(let i=0; i<keyFrames.length; i++){
      if(i==0){
        value += keyFrames[i] / (1 + pow(Math.E-1.64, (startOffset+(-1*this.currentFrame))));
        startOffset += -startOffset;
      }else{
        value += (keyFrames[i]-keyFrames[i-1]) / (1 + pow(Math.E-1.64, (startOffset+(-1*this.currentFrame))));
        startOffset += aOffset;
      }
    }

    this.frame+=0.33;
    return value;
  }

}
