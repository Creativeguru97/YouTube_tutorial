class NoiseLoop{

  constructor(diameter, min, max){
    this.diameter = diameter;
    this.min = min;
    this.max = max;
    this.cx = random(1000);
    this.cy = random(1000);
  }

  value(a){
    let xOff = map(cos(a), -1, 1, this.cx, this.cx+this.diameter);
    let yOff = map(sin(a), -1, 1, this.cy, this.cy+this.diameter);
    let r = noise(xOff, yOff);
    return map(r, 0, 1, this.min, this.max);
  }

}
