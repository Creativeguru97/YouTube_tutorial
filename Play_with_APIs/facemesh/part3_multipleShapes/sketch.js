let sketch = function(p){
  let canvas;
  let dMouse = [];
  let closest = 0;
  let isEditMode = false;

  let shapes = [[]];
  /*
  let sample2DArray = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
  */

  let shapeIndex = 0;

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
        p.glow();
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
    if(isEditMode == true) shapes[shapeIndex].push(closest);
    console.log(shapes);
  }

  p.drawShapes = function(){
    for(let s = 0; s < shapes.length; s++){
      if(s == shapeIndex) p.fill(0, 0, 50);
      else p.fill(0, 0, 0);
      p.stroke(0, 0, 100);
      p.strokeWeight(3);

      p.beginShape();
        for(let i = 0; i < shapes[s].length; i++){
          p.vertex(
            detections.multiFaceLandmarks[0][shapes[s][i]].x * p.width,
            detections.multiFaceLandmarks[0][shapes[s][i]].y * p.height,
          );
        }
      p.endShape();
    }
  }

  p.keyTyped = function(){
    if(p.key === 'e') isEditMode = !isEditMode;

    if(p.key === 'c'){
      if(shapes[shapes.length-1].length > 0){
        shapes.push([]);
        shapeIndex = shapes.length-1;
      }
      console.log(shapes);
    }

    if(p.key === 'z'){
      if(shapes[shapeIndex] != undefined){
        if(shapes[shapeIndex].length > 0) shapes[shapeIndex].pop();
      }
      console.log(shapes[shapeIndex]);
    }

    if(p.key === 'd'){
      shapes = [[]];
      shapeIndex = 0;
      console.log(shapes);
    }
  }

  p.keyPressed = function(){
    if(p.keyCode === p.UP_ARROW){
      if(shapes[shapeIndex] != undefined){
        if(shapes[shapeIndex].length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
        if(shapeIndex < shapes.length-1) shapeIndex++;
      }
    } else if(p.keyCode === p.DOWN_ARROW){
      if(shapes[shapeIndex] != undefined){
        if(shapes[shapeIndex].length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
        if(shapeIndex > 0) shapeIndex--;
      }
    }
    console.log(shapeIndex);
  }

  p.glow = function(){
    p.drawingContext.shadowOffsetX = 0;
    p.drawingContext.shadowOffsetY = 0;
    p.drawingContext.shadowBlur = 20;
    p.drawingContext.shadowColor = 'rgba(255, 255, 255, 100)';
  }
}

let myp5 = new p5(sketch);
