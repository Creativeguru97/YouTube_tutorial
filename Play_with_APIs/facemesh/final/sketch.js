let sketch = function(p){
  let canvas;
  let dMouse = [];
  let closest = 0;
  let isEditMode = false;

  let fill_H_Slider, fill_S_Slider, fill_B_Slider, fill_O_Slider;
  let fill_H_Value, fill_S_Value, fill_B_Value, fill_O_Value;
  let stroke_H_Slider, stroke_S_Slider, stroke_B_Slider, stroke_O_Slider;
  let stroke_H_Value, stroke_S_Value, stroke_B_Value, stroke_O_Value;

  let edit_button;
  let screenshot_button;
  let save_drawing_button;
  let index_UP_button;
  let index_DOWN_button;
  let complete_button;
  let undo_button;
  let delete_button;

  let shapes = [{
    fill_H : p.random(360),
    fill_S : 50,
    fill_B : 100,
    fill_O : 100,
    stroke_H : p.random(360),
    stroke_S : 50,
    stroke_B : 100,
    stroke_O : 100,
    indices : []
  }];

  let shapeIndex = 0;
  let tParameters;
  let capture;
  let shapesData;
  let isDraggedOver = false;

  p.setup = function(){
    canvas = p.createCanvas(1280, 720);//Or (640, 480)
    canvas.id('canvas');
    canvas.dragOver(() => {
      isDraggedOver = true;
    });
    canvas.dragLeave(() => {
      isDraggedOver = false;
    });

    canvas.drop((file) => {
      if(file.subtype == 'json'){
        shapes = file.data.shapes;
        shapeIndex = shapes.length-1;
        isDraggedOver = false;
      }else{
        isDraggedOver = false;
      }
    });

    p.colorMode(p.HSB, 360, 100, 100, 100);

    edit_button = p.createButton("Edit mode off");
    edit_button.mousePressed(p.toggleEdit);
    edit_button.class("Buttons");
    edit_button.id("edit_button");

    fill_H_Value = p.createDiv();
    fill_H_Value.class('valueDisplay');
    fill_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    fill_H_Slider.class('Slider');

    fill_S_Value = p.createDiv();
    fill_S_Value.class('valueDisplay');
    fill_S_Slider = p.createSlider(0, 100, 50, 5);
    fill_S_Slider.class('Slider');

    fill_B_Value = p.createDiv();
    fill_B_Value.class('valueDisplay');
    fill_B_Slider = p.createSlider(0, 100, 100, 5);
    fill_B_Slider.class('Slider');

    fill_O_Value = p.createDiv();
    fill_O_Value.class('valueDisplay');
    fill_O_Slider = p.createSlider(0, 100, 100, 5);
    fill_O_Slider.class('Slider');

    stroke_H_Value = p.createDiv();
    stroke_H_Value.class('valueDisplay');
    stroke_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    stroke_H_Slider.class('Slider');

    stroke_S_Value = p.createDiv();
    stroke_S_Value.class('valueDisplay');
    stroke_S_Slider = p.createSlider(0, 100, 50, 5);
    stroke_S_Slider.class('Slider');

    stroke_B_Value = p.createDiv();
    stroke_B_Value.class('valueDisplay');
    stroke_B_Slider = p.createSlider(0, 100, 100, 5);
    stroke_B_Slider.class('Slider');

    stroke_O_Value = p.createDiv();
    stroke_O_Value.class('valueDisplay');
    stroke_O_Slider = p.createSlider(0, 100, 100, 5);
    stroke_O_Slider.class('Slider');

    screenshot_button = p.createButton("");
    screenshot_button.mousePressed(p.screenShot);
    screenshot_button.class("imageButtons");
    screenshot_button.id("screenshot_button");

    save_drawing_button = p.createButton("");
    save_drawing_button.mousePressed(p.saveDrawing);
    save_drawing_button.class("imageButtons");
    save_drawing_button.id("save_drawing_button");

    index_UP_button = p.createButton("");
    index_UP_button.mousePressed(p.upIndex);
    index_UP_button.class("imageButtons");
    index_UP_button.id("index_UP_button");

    index_DOWN_button = p.createButton("");
    index_DOWN_button.mousePressed(p.downIndex);
    index_DOWN_button.class("imageButtons");
    index_DOWN_button.id("index_DOWN_button");

    complete_button = p.createButton("complete");
    complete_button.mousePressed(p.complete);
    complete_button.class("Buttons");
    complete_button.id("complete_button");

    undo_button = p.createButton("undo");
    undo_button.mousePressed(p.undo);
    undo_button.class("Buttons");
    undo_button.id("undo_button");

    delete_button = p.createButton("delete");
    delete_button.mousePressed(p.deleteDrawing);
    delete_button.class("Buttons");
    delete_button.id("delete_button");

    tParameters = {
      fill_H : fill_H_Slider.value(),
      fill_S : fill_S_Slider.value(),
      fill_B : fill_B_Slider.value(),
      fill_O : fill_O_Slider.value(),
      stroke_H : stroke_H_Slider.value(),
      stroke_S : stroke_S_Slider.value(),
      stroke_B : stroke_B_Slider.value(),
      stroke_O : stroke_O_Slider.value()
    }

    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide();

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        p.drawShapes();
        if(isEditMode == true){
          p.faceMesh();
          p.editShapes();
        }
        p.glow();

        if(isDraggedOver == true){
          p.noStroke();
          p.fill(0, 0, 100, 10);
          p.rect(0, 0, p.width, p.height);
          p.fill(0, 0, 100);
          p.text('Drag your drawing here', p.width/2, p.height/2);
        }
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
    p.stroke(0, 0, 100);
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
    if(p.mouseX >= 0 && p.mouseX <= p.width){
      if(p.mouseY >= 0 && p.mouseY <= p.height){
        if(isEditMode == true){
          shapes[shapeIndex].indices.push(closest);
          console.log(shapes);
        }
      }
    }
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

      if(isEditMode == true){
        if(s == shapeIndex) p.glow('rgba(255, 255, 255, 100)');
        else p.glow('rgba(255, 255, 255, 0)');
      }else if(isEditMode == false){
        p.glow('rgba(255, 255, 255, 100)');
      }

      p.beginShape();
        for(let i = 0; i < shapes[s].indices.length; i++){
          p.vertex(
            detections.multiFaceLandmarks[0][shapes[s].indices[i]].x * p.width,
            detections.multiFaceLandmarks[0][shapes[s].indices[i]].y * p.height,
          );
        }
      p.endShape();
    }
  }

  p.editShapes = function(){
    // --- fill ---
    if(tParameters.fill_H != fill_H_Slider.value()){
      tParameters.fill_H = fill_H_Slider.value();
      shapes[shapeIndex].fill_H = fill_H_Slider.value();
    }
    if(tParameters.fill_S!= fill_S_Slider.value()){
      tParameters.fill_S = fill_S_Slider.value();
      shapes[shapeIndex].fill_S = fill_S_Slider.value();
    }
    if(tParameters.fill_B != fill_B_Slider.value()){
      tParameters.fill_B = fill_B_Slider.value();
      shapes[shapeIndex].fill_B = fill_B_Slider.value();
    }
    if(tParameters.fill_O != fill_O_Slider.value()){
      tParameters.fill_O = fill_O_Slider.value();
      shapes[shapeIndex].fill_O = fill_O_Slider.value();
    }

    // --- stroke ---
    if(tParameters.stroke_H != stroke_H_Slider.value()){
      tParameters.stroke_H = stroke_H_Slider.value();
      shapes[shapeIndex].stroke_H = stroke_H_Slider.value();
    }
    if(tParameters.stroke_S != stroke_S_Slider.value()){
      tParameters.stroke_S = stroke_S_Slider.value();
      shapes[shapeIndex].stroke_S = stroke_S_Slider.value();
    }
    if(tParameters.stroke_B != stroke_B_Slider.value()){
      tParameters.stroke_B = stroke_B_Slider.value();
      shapes[shapeIndex].stroke_B = stroke_B_Slider.value();
    }
    if(tParameters.stroke_O != stroke_O_Slider.value()){
      tParameters.stroke_O = stroke_O_Slider.value();
      shapes[shapeIndex].stroke_O = stroke_O_Slider.value();
    }
  }

  p.keyTyped = function(){
    if(p.key === 'e') p.toggleEdit();
    if(p.key === 'c') p.complete();
    if(p.key === 'z') p.undo();
    if(p.key === 'd') p.deleteDrawing();
    if(p.key === 's') p.screenShot();
    if(p.key === 'j') p.saveDrawing();
  }

  p.toggleEdit = function(){
    isEditMode = !isEditMode;

    if(isEditMode == true){
      edit_button.html("Edit mode on");
    }else if(isEditMode == false){
      edit_button.html("Edit mode off");
    }
  }

  p.complete = function(){
    if(shapes[shapes.length-1].indices.length > 0){
      if(shapes[shapeIndex].indices.length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);

      shapes.push(
        {
          fill_H : p.random(360),
          fill_S : 50,
          fill_B : 100,
          fill_O : 100,
          stroke_H : p.random(360),
          stroke_S : 50,
          stroke_B : 100,
          stroke_O : 100,
          indices : []
        }
      );
      shapeIndex = shapes.length-1;
    }
    console.log(shapes);
  }

  p.undo = function(){
    if(shapes[shapeIndex] != undefined){
      if(shapes[shapeIndex].indices.length > 0) shapes[shapeIndex].indices.pop();
    }
    console.log(shapes[shapeIndex].indices);
  }

  p.deleteDrawing = function(){
    shapes = [
      {
        fill_H : p.random(360),
        fill_S : 50,
        fill_B : 100,
        fill_O : 100,
        stroke_H : p.random(360),
        stroke_S : 50,
        stroke_B : 100,
        stroke_O : 100,
        indices : []
      }
    ];
    shapeIndex = 0;
    console.log(shapes);
  }

  p.screenShot = function(){
    p.image(capture.get(0, 0, p.width, p.height), 0, 0, p.width, p.height);
    p.drawShapes();
    p.glow();
    p.saveCanvas('screenShot', 'png');
  }

  p.saveDrawing = function(){
    let s = {shapes};
    p.saveJSON(s, 'untitled_shapes.json');
  }

  p.keyPressed = function(){
    if(p.keyCode === p.UP_ARROW) p.upIndex();
    else if(p.keyCode === p.DOWN_ARROW) p.downIndex();
  }

  p.upIndex = function(){
    if(shapes[shapeIndex] != undefined){
      if(shapes[shapeIndex].indices.length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
      if(shapeIndex < shapes.length-1) shapeIndex++;
      p.resetSliders();
      console.log(shapeIndex);
    }
  }

  p.downIndex = function(){
    if(shapes[shapeIndex] != undefined){
      if(shapes[shapeIndex].indices.length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
      if(shapeIndex > 0) shapeIndex--;
      p.resetSliders();
      console.log(shapeIndex);
    }
  }

  p.resetSliders = function(){
    fill_H_Slider.value(shapes[shapeIndex].fill_H);
    fill_S_Slider.value(shapes[shapeIndex].fill_S);
    fill_B_Slider.value(shapes[shapeIndex].fill_B);
    fill_O_Slider.value(shapes[shapeIndex].fill_O);
    stroke_H_Slider.value(shapes[shapeIndex].stroke_H);
    stroke_S_Slider.value(shapes[shapeIndex].stroke_S);
    stroke_B_Slider.value(shapes[shapeIndex].stroke_B);
    stroke_O_Slider.value(shapes[shapeIndex].stroke_O);
  }

  p.glow = function(glowColor){
    p.drawingContext.shadowOffsetX = 0;
    p.drawingContext.shadowOffsetY = 0;
    p.drawingContext.shadowBlur = 20;
    p.drawingContext.shadowColor = glowColor;
  }
}

let myp5 = new p5(sketch);
