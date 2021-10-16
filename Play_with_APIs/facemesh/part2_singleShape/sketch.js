let sketch = function(p){
  let canvas;
  let dMouse = [];
  let closest = 0;
  let shapes = [];
  let isEditMode = false;

  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id('canvas');

    p.colorMode(p.HSB);
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        p.drawShapes();
        if(isEditMode == true) p.faceMesh();
      }
    }
  }

  p.faceMesh = function(){
    p.stroke(255);
    p.strokeWeight(3);

    p.beginShape(p.POINTS);
    for(let i=0; i<detections.multiFaceLandmarks[0].length; i++){
      let x = detections.multiFaceLandmarks[0][i].x * p.width;
      let y = detections.multiFaceLandmarks[0][i].y * p.height;
      p.vertex(x, y);

      let d = p.dist(x, y, p.mouseX, p.mouseY);
      dMouse.push(d);
    }
    p.endShape();

    let minimum = p.min(dMouse);
    closest = dMouse.indexOf(minimum);

    p.stroke(0, 100, 100);
    p.strokeWeight(10);
    p.point(
      detections.multiFaceLandmarks[0][closest].x * p.width,
      detections.multiFaceLandmarks[0][closest].y * p.height
    );

    dMouse.splice(0, dMouse.length);
  }

  p.mouseClicked = function(){
    if(isEditMode == true) shapes.push(closest);
    console.log(shapes);
  }

  p.drawShapes = function(){
    p.fill(0, 0, 0);
    p.stroke(0, 0, 100);
    p.strokeWeight(3);

    p.beginShape();
      for(let i = 0; i < shapes.length; i++){
        p.vertex(
          detections.multiFaceLandmarks[0][shapes[i]].x * p.width,
          detections.multiFaceLandmarks[0][shapes[i]].y * p.height,
        );
      }
    p.endShape();
  }

  p.keyTyped = function(){
    if(p.key === 'e') isEditMode = !isEditMode;
  }
}

let myp5 = new p5(sketch);
