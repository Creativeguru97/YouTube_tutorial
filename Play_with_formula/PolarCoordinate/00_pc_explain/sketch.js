
let pointLocation;
let locationStore;

function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  textFont('Helvetica Neue', 14);
  textAlign(CENTER, CENTER);

  stroke(32, 18, 99, 100);
  fill(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  strokeWeight(1);

  pointLocation = createVector(random(-width/2-20, width/2-20), random(-height/2-20, height/2-20));
  locationStore = pointLocation;
}

function draw(){
  background(191, 23, 36, 100);//color name: 錆鼠 さびねず
  translate(width/2, height/2);

  shadow();
  coordinate();
}

function coordinate(){

  //x-axis
  line(-width/2+20, 0, width/2-20, 0);
  for(let x = -width/2+50; x <= width/2-50; x += 50){
    line(x, -5, x, 5);
  }
  //y-axis
  line(0, -height/2+20, 0, height/2-20);
  for(let y = -height/2+50; y <= height/2-50; y += 50){
    line(-5, y, 5, y);
  }

  text("0", -10, 15);//centre

  //Mouse drag effect
  if(mouseIsPressed){
    pointLocation.x = mouseX - width/2;
    pointLocation.y = mouseY - height/2;
    locationStore = pointLocation;
  }else{
    pointLocation.x = locationStore.x;
    pointLocation.y = locationStore.y;
  }

  // cartesian(pointLocation.x, pointLocation.y);
  // polar(pointLocation.x, pointLocation.y);
  sohcahtoa(pointLocation.x, pointLocation.y);

  fill(32, 18, 99, 100);//color name: 薄卵色 うすたまごいろ
  ellipse(pointLocation.x, pointLocation.y, 12, 12);
}

function cartesian(x, y){
  drawingContext.setLineDash([2, 8]);
  line(x, 0, x, y);//vertical line
  line(0, y, x, y);//horizontal line
  drawingContext.setLineDash([0, 0]);

  text(nf(str(x), 1, 1), x, 20);
  text(nf(str(-y), 1, 1), -25, y);
  text("(x, y)" + " = " + "(" + nf(str(x), 1, 1) + ", " + nf(str(-y), 1, 1) + ")", x+80, y-10);
}

function polar(x, y){
  drawingContext.setLineDash([1, 8]);
  line(x, 0, x, y);//vertical line
  line(0, y, x, y);//horizontal line
  drawingContext.setLineDash([4, 3]);
  line(0, 0, x, y);//centre to the point

  for(let r = 0; r < width/2-20; r+=50){
    for(let theta = 0; theta < 360; theta+=10){
      let px = r * cos(theta);
      let py = r * sin(theta);
      point(px, py);
    }
  }

  let theta = atan2(y, x);
  let radius = sqrt(pow(x, 2) + pow(y, 2));

  fill(32, 18, 99, 20);
  arc(0, 0, radius/3, radius/3, theta, 0);
  drawingContext.setLineDash([0, 0]);

  //length of the radius
  let rLocation = createVector(radius/2 * cos(theta), radius/2 * sin(theta)-15);
  text(nf("r = " + str(radius), 1, 1), rLocation.x, rLocation.y);

  //the theta
  if(theta >= 0 && theta <= 180){
    let mappedTheta = map(theta, 180, 0, -90, -180);
    let thetaLocation = createVector((radius+60)/6 * cos(mappedTheta), (radius+60)/6 * sin(mappedTheta));

    let diaplayedTheta = map(theta, 180, 0, 180, 360);
    text("θ = " + nf(str(diaplayedTheta), 1, 1)+" °", thetaLocation.x, thetaLocation.y);
    text("(r, θ)" + " = " + "(" + nf(str(radius), 1, 1) + ", " + nf(str(diaplayedTheta), 1, 1)+ ")", x+80, y-10);
  }else{
    let thetaLocation = createVector((radius+60)/6 * cos(theta/2), (radius+60)/6 * sin(theta/2));

    let diaplayedTheta = map(theta, -180, 0, 180, 0);
    text("θ = " + nf(str(diaplayedTheta), 1, 1)+" °", thetaLocation.x, thetaLocation.y);
    text("(r, θ)" + " = " + "(" + nf(str(radius), 1, 1) + ", " + nf(str(diaplayedTheta), 1, 1)+ ")", x+80, y-10);
  }

  //r*cos(theta)
  text("r cosθ", x/2, y+10);
  //r*sin(theta)
  text("r sinθ", x+25, y/2);
}

function sohcahtoa(x, y){
  drawingContext.setLineDash([1, 8]);
  line(0, y, x, y);//horizontal line
  drawingContext.setLineDash([4, 3]);
  line(x, 0, x, y);//vertical line
  line(0, 0, x, y);//centre to the point

  for(let r = 0; r < width/2-20; r+=50){
    for(let theta = 0; theta < 360; theta+=10){
      let x = r * cos(theta);
      let y = r * sin(theta);
      point(x, y);
    }
  }

  let theta = atan2(y, x);
  let radius = sqrt(pow(x, 2) + pow(y, 2));

  fill(32, 18, 99, 20);
  arc(0, 0, radius/3, radius/3, theta, 0);
  drawingContext.setLineDash([0, 0]);

  let hypotenuse_loc = createVector(radius/2 * cos(theta), radius/2 * sin(theta)-15);
  text("Hypotenuse", hypotenuse_loc.x, hypotenuse_loc.y);

  let opposite_loc = createVector(x+25, y/2);
  text("Opposite", opposite_loc.x, opposite_loc.y);

  let adjacent_loc = createVector(x/2, 10);
  text("Adjacent", adjacent_loc.x, adjacent_loc.y);

  //the theta
  if(theta >= 0 && theta <= 180){
    let mappedTheta = map(theta, 180, 0, -90, -180);
    let thetaLocation = createVector((radius+60)/6 * cos(mappedTheta), (radius+60)/6 * sin(mappedTheta));
    text("θ", thetaLocation.x, thetaLocation.y);

    let cosTheta = map(theta, 0, 180, -180, 0);
    let cosLocation = createVector((radius+60)/6 * cos(cosTheta), (radius+60)/8 * sin(cosTheta));
    text("cos(θ) = A/H", cosLocation.x, cosLocation.y);
  }else{
    let thetaLocation = createVector((radius+60)/6 * cos(theta/2), (radius+60)/6 * sin(theta/2));
    text("θ", thetaLocation.x, thetaLocation.y);

    let cosTheta = map(theta, 0, -180, 180, 0);
    let cosLocation = createVector((radius+60)/6 * cos(cosTheta), (radius+60)/8 * sin(cosTheta));
    text("cos(θ) = A/H", cosLocation.x, cosLocation.y);
  }

  text("sin(θ) = O/H", x+20, y-20);
  text("tan(θ) = O/A", x, 20);
}

function shadow(){
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}
