let sketch = function(p5){
  let maskCanvas;
  let dMouse = [];

  let drawPoints = [{
    fillHue : p5.random(360),
    strokeHue : p5.random(360),
    shapeVerticies : []
  }];

  let closist;
  let editingIndex = 0;
  let isEditMode = false;

  p5.setup = function(){
    maskCanvas = p5.createCanvas(640, 480, p5.WEBGL);
    maskCanvas.id("canvas");
    p5.colorMode(p5.HSB);
  }

  p5.draw = function(){
    p5.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        // console.log(detections);
        p5.shapes();
        if(isEditMode == true) p5.faceMesh();
        // p.shadow();
      }
    }
  }

  p5.faceMesh = function(){
    p5.beginShape(p5.POINTS);
    for(let j=0; j<detections.multiFaceLandmarks[0].length; j++){
      let x = detections.multiFaceLandmarks[0][j].x * p5.width - p5.width/2;
      let y = detections.multiFaceLandmarks[0][j].y * p5.height - p5.height/2;
      let z = detections.multiFaceLandmarks[0][j].z;
      // p.strokeWeight(0);
      // p.textFont('Helvetica Neue');
      // p.text(j, x, y);
      p5.stroke(255);
      p5.strokeWeight(3);
      p5.vertex(x, y, z);

      let d = p5.dist(x, y, p5.mouseX - p5.width/2, p5.mouseY - p5.height/2);
      dMouse.push(d);
    }
    p5.endShape();

    let minimum = p5.min(dMouse);
    closist = dMouse.indexOf(minimum);

    p5.stroke(0, 100, 100);
    p5.strokeWeight(10);
    p5.point(
      detections.multiFaceLandmarks[0][closist].x * p5.width - p5.width/2,
      detections.multiFaceLandmarks[0][closist].y * p5.height - p5.height/2
    );

    // console.log(closist);
    dMouse.splice(0, dMouse.length);
  }

  p5.mouseClicked = function(){
    if(isEditMode == true) drawPoints[editingIndex].shapeVerticies.push(closist);
  }

  p5.keyTyped = function(){
    //Complete editing current shape
    if(p5.key === 'c'){// C means Compulete
      if(drawPoints[drawPoints.length-1].shapeVerticies.length > 0){
        drawPoints.push(
          {
            fillHue : p5.random(360),
            strokeHue : p5.random(360),
            shapeVerticies : []
          }
        );//Add another JS object to store verticies index
        editingIndex++;
      }
      console.log(drawPoints);
    }

    //Toggle edit mode
    if(p5.key === 'e'){
      isEditMode = !isEditMode;
      if(drawPoints[drawPoints.length-1].shapeVerticies.length > 0){
        drawPoints.push(
          {
            fillHue : p5.random(360),
            strokeHue : p5.random(360),
            shapeVerticies : []
          }
        );//Add another JS object to store verticies index
        editingIndex++;
      }
      console.log(drawPoints);
    }

    //The Command Z function!: Delete the point lastest added
    if(p5.key === 'z'){
      if(drawPoints[drawPoints.length-1].shapeVerticies.length > 0){
        drawPoints[drawPoints.length-1].shapeVerticies.pop();
      }
      console.log(drawPoints[drawPoints.length-1].shapeVerticies);
    }

    //Delete all the shapes
    if(p5.key === 'd'){
      drawPoints = [{
        fillHue : p5.random(360),
        strokeHue : p5.random(360),
        shapeVerticies : []
      }]
      editingIndex = 0;
      console.log(drawPoints);
    }

  }


  p5.shapes = function(){
    // [10, 332, 389, 323, 397, 378, 152, 149, 172, 93, 162, 103]

    for(let s = 0; s < drawPoints.length; s++){
      p5.fill(drawPoints[s].fillHue, 100, 100);
      p5.stroke(drawPoints[s].strokeHue, 100, 100);
      p5.strokeWeight(3);

      p5.beginShape();
        for(let p=0; p<drawPoints[s].shapeVerticies.length; p++){
          p5.vertex(
            detections.multiFaceLandmarks[0][drawPoints[s].shapeVerticies[p]].x * p5.width - p5.width/2,
            detections.multiFaceLandmarks[0][drawPoints[s].shapeVerticies[p]].y * p5.height - p5.height/2
          );
        }
      p5.endShape(p5.CLOSE);
    }
  }

  p5.shadow = function(){
    p5.drawingContext.shadowOffsetX = 0;
    p5.drawingContext.shadowOffsetY = 0;
    p5.drawingContext.shadowBlur = 30;
    p5.drawingContext.shadowColor = 'rgba(0, 0, 0, 100)';
  }
}

let myp52 = new p5(sketch);
