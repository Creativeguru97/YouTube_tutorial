float y = 0;
int amplitude = 50;
int period = 100;

void setup(){
  size(600, 300);
  stroke(255);
  noFill();
}

void draw(){
  background(0);
  translate(0, height/2);
  
  strokeWeight(1);
  line(0, 0, width, 0);
  
  strokeWeight(2);
  beginShape();
  for(int x=0-(period/2-1); x<width-1; x++){
   y = -2*amplitude/PI*atan(cot(x*PI/period));
   vertex(x+period/2-1, y-amplitude);
  }
  endShape();
}

float cot(float theta){
  return sin(theta)/cos(theta);
}
