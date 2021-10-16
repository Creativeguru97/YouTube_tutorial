let sketch = function(p){
  let maskCanvas;
  let dMouse = [];

  let userInterface;
  let editButton;
  let isEditMode = false;

  let fill_H_Slider, fill_S_Slider, fill_B_Slider, fill_O_Slider;
  let fill_H_Value, fill_S_Value, fill_B_Value, fill_O_Value;
  let stroke_H_Slider, stroke_S_Slider, stroke_B_Slider, stroke_O_Slider;
  let stroke_H_Value, stroke_S_Value, stroke_B_Value, stroke_O_Value;

  let screenShotButton;
  let completeButton;
  let undoButton;
  let deleteButton;


  let shapes = [{
    fill_H : p.random(360),
    fill_S : 100,
    fill_B : 100,
    fill_O : 100,
    stroke_H : p.random(360),
    stroke_S : 100,
    stroke_B : 100,
    stroke_O : 100,
    shapeVerticies : []
  }];

  let closest;
  let editingIndex = 0;

  let capture;

  let shapesData;

  p.preload = function(){
    shapesData = p.loadJSON("masks/pumpkin.json");
    // shapesData = p.loadJSON("masks/ghost.json");
    // shapesData = p.loadJSON("masks/grey.json");
    // shapesData = p.loadJSON("masks/operaMask.json");
    // shapesData = p.loadJSON("masks/operaMask2.json");
    // shapesData = p.loadJSON("masks/operaMask3.json");
    // shapesData = p.loadJSON("masks/operaMask4.json");
    // shapesData = p.loadJSON("masks/fox.json");
    // shapesData = p.loadJSON("masks/clown.json");
    // shapesData = p.loadJSON("masks/clown2.json");
    // shapesData = p.loadJSON("masks/clown3.json");
  }

  p.setup = function(){
    maskCanvas = p.createCanvas(1280, 720);
    maskCanvas.id("canvas");
    p.colorMode(p.HSB, 360, 100, 100, 100);

    editButton = p.createButton("Edit mode off");
    editButton.mousePressed(p.toggleEdit);
    editButton.class('EditButton');

    fill_H_Value = p.createP();
    fill_H_Value.class('valueDisplay');
    fill_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    fill_H_Slider.class('Slider');

    fill_S_Value = p.createP();
    fill_S_Value.class('valueDisplay');
    fill_S_Slider = p.createSlider(0, 100, 50, 5);
    fill_S_Slider.class('Slider');

    fill_B_Value = p.createP();
    fill_B_Value.class('valueDisplay');
    fill_B_Slider = p.createSlider(0, 100, 100, 5);
    fill_B_Slider.class('Slider');

    fill_O_Value = p.createP();
    fill_O_Value.class('valueDisplay');
    fill_O_Slider = p.createSlider(0, 100, 100, 5);
    fill_O_Slider.class('Slider');

    stroke_H_Value = p.createP();
    stroke_H_Value.class('valueDisplay');
    stroke_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    stroke_H_Slider.class('Slider');

    stroke_S_Value = p.createP();
    stroke_S_Value.class('valueDisplay');
    stroke_S_Slider = p.createSlider(0, 100, 50, 5);
    stroke_S_Slider.class('Slider');

    stroke_B_Value = p.createP();
    stroke_B_Value.class('valueDisplay');
    stroke_B_Slider = p.createSlider(0, 100, 100, 5);
    stroke_B_Slider.class('Slider');

    stroke_O_Value = p.createP();
    stroke_O_Value.class('valueDisplay');
    stroke_O_Slider = p.createSlider(0, 100, 100, 5);
    stroke_O_Slider.class('Slider');


    screenShotButton = p.createButton('');
    screenShotButton.mousePressed(p.screenShot);
    screenShotButton.id('ScreenShotButton');

    completeButton = p.createButton("complete");
    completeButton.mousePressed(p.addShape);
    completeButton.class('Buttons');
    completeButton.id('CompleteButton');

    undoButton = p.createButton("undo");
    undoButton.mousePressed(p.undo);
    undoButton.class('Buttons');
    undoButton.id('UndoButton');

    deleteButton = p.createButton("delete");
    deleteButton.mousePressed(p.deleteShapes);
    deleteButton.class('Buttons');
    deleteButton.id('DeleteButton');

    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide();

    shapes = shapesData.shapes;

    editingIndex = shapes.length-1;
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        p.image(capture.get(0, 0, p.width, p.height), 0, 0, p.width, p.height);
        p.drawShapes();
        p.shadow();
        if(isEditMode == true) p.faceMesh();

        p.editShapes();
      }
    }

    fill_H_Value.html("fill hue: " + fill_H_Slider.value());
    fill_S_Value.html("fill saturation: " + fill_S_Slider.value());
    fill_B_Value.html("fill brightness: " + fill_B_Slider.value());
    fill_O_Value.html("fill opacity: " + fill_O_Slider.value());

    stroke_H_Value.html("stroke hue: " + stroke_H_Slider.value());
    stroke_S_Value.html("stroke saturation: " + stroke_S_Slider.value());
    stroke_B_Value.html("stroke brightness: " + stroke_B_Slider.value());
    stroke_O_Value.html("stroke opacity: " + stroke_O_Slider.value());
  }

  p.faceMesh = function(){
    p.beginShape(p.POINTS);
    for(let j=0; j<detections.multiFaceLandmarks[0].length; j++){
      let x = detections.multiFaceLandmarks[0][j].x * p.width;
      let y = detections.multiFaceLandmarks[0][j].y * p.height;

      p.stroke(0);
      p.strokeWeight(3);
      p.vertex(x, y);

      // p.strokeWeight(0);
      p.textSize(10);
      p.text(p.str(j), x, y);

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

    console.log(closest);
    dMouse.splice(0, dMouse.length);
  }

  p.drawShapes = function(){
    for(let s = 0; s < shapes.length; s++){
      p.fill(
        shapes[s].fill_H,
        shapes[s].fill_S,
        shapes[s].fill_B,
        shapes[s].fill_O
      );

      p.stroke(
        shapes[s].stroke_H,
        shapes[s].stroke_S,
        shapes[s].stroke_B,
        shapes[s].stroke_O
      );
      p.strokeWeight(3);

      p.beginShape();
        for(let v=0; v<shapes[s].shapeVerticies.length; v++){
          p.vertex(
            detections.multiFaceLandmarks[0][shapes[s].shapeVerticies[v]].x * p.width,
            detections.multiFaceLandmarks[0][shapes[s].shapeVerticies[v]].y * p.height
          );
        }
      p.endShape();
    }
  }

  p.editShapes = function(){
    //Temporary comment out below not to overwrite properties of the JSON

    shapes[editingIndex].fill_H = fill_H_Slider.value();
    shapes[editingIndex].fill_S = fill_S_Slider.value();
    shapes[editingIndex].fill_B = fill_B_Slider.value();
    shapes[editingIndex].fill_O = fill_O_Slider.value();

    shapes[editingIndex].stroke_H = stroke_H_Slider.value();
    shapes[editingIndex].stroke_S = stroke_S_Slider.value();
    shapes[editingIndex].stroke_B = stroke_B_Slider.value();
    shapes[editingIndex].stroke_O = stroke_O_Slider.value();
  }

  p.shadow = function(){
    p.drawingContext.shadowOffsetX = 0;
    p.drawingContext.shadowOffsetY = 0;
    p.drawingContext.shadowBlur = 30;
    p.drawingContext.shadowColor = 'rgba(255, 255, 255, 100)';
  }

  p.mouseClicked = function(){
    if(p.mouseX >= 0 && p.mouseX <= p.width){
      if(p.mouseY >= 0 && p.mouseY <= p.height){
        if(isEditMode == true) shapes[editingIndex].shapeVerticies.push(closest);
        console.log(closest);
      }
    }
  }

  p.toggleEdit = function(){
    if(isEditMode == false){
      editButton.html("Edit mode on");
    }else if(isEditMode == true){
      editButton.html("Edit mode off");
    }
    isEditMode = !isEditMode;

    p.addShape();
  }

  p.addShape = function(){
    if(shapes[shapes.length-1].shapeVerticies.length > 0){
      shapes.push(
        {
          fill_H : p.random(360),
          fill_S : 100,
          fill_B : 100,
          fill_O : 100,
          stroke_H : p.random(360),
          stroke_S : 100,
          stroke_B : 100,
          stroke_O : 100,
          shapeVerticies : []
        }
      );//Add another JS object to store verticies index
      editingIndex++;
    }
    console.log(shapes);
  }

  p.undo = function(){
    if(shapes[shapes.length-1].shapeVerticies.length > 0){
      shapes[shapes.length-1].shapeVerticies.pop();
    }
    console.log(shapes[shapes.length-1].shapeVerticies);
  }

  p.deleteShapes = function(){
    shapes = [{
      fill_H : p.random(360),
      fill_S : 100,
      fill_B : 100,
      fill_O : 100,
      stroke_H : p.random(360),
      stroke_S : 100,
      stroke_B : 100,
      stroke_O : 100,
      shapeVerticies : []
    }]
    editingIndex = 0;
    console.log(shapes);
  }

  p.screenShot = function(){
    p.saveCanvas('screenShot', 'png');
  }

  p.saveShapes = function(){
    let s = {shapes};
    p.saveJSON(s, 'drawing.json');
  }

  p.keyTyped = function(){
    //Complete editing current shape
    if(p.key === 'c'){// C means Compulete
      p.addShape();
    }

    //Toggle edit mode
    if(p.key === 'e'){
      p.toggleEdit();
    }

    //The Command Z function!: Delete the point lastest added
    if(p.key === 'z'){
      p.undo();
    }

    //Delete all the shapes
    if(p.key === 'd'){
      p.deleteShapes();
    }

    //Take a screenshot
    if(p.key === 's') p.screenShot();

    //Save a json file
    if(p.key === 'j'){
      p.saveShapes();
    }
  }
}

let myp5 = new p5(sketch);
