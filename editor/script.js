var stage = new Konva.Stage({
    container: 'container', // Specify the ID of the container element
    width: window.innerWidth, // Set the stage width
    height: window.innerHeight // Set the stage height
  });
  
  var layer = new Konva.Layer();

  stage.add(layer); // Add the layer to the stage
  
  var tool = {
    name: ('pen'),
    shapeType: ('line'),
    color: 'black',
    size: 5
  };
  let isDrawing = false;
  let lastLine;
  var startX, startY, rect;
  stage.on('mousedown touchstart', function(event) {
    var pos = stage.getPointerPosition(); // Get the position of the mouse or touch relative to the stage
    if (tool.name === 'pen') {
      isDrawing = true;
      lastLine = new Konva.Line({
        stroke: colorPicker.value,
        strokeWidth: tool.size,
        points: [pos.x, pos.y]
      });
      layer.add(lastLine); // Add the line to the layer
    } else if (tool.name === 'rectangle') {
      isDrawing = true;
      var pos = stage.getPointerPosition();
      startX = pos.x;
      startY = pos.y;
      rect = new Konva.Rect({
          x: startX,
          y: startY,
          width: 0,
          height: 0,
          stroke: colorPicker.value,
          strokeWidth: tool.size,
          fill: FillcolorPicker.value,
      });
      layer.add(rect);
  }});


  stage.on('mousemove touchmove', function(event) {
    if (!isDrawing) {
      return;
    }
    var pos = stage.getPointerPosition(); // Get the position of the mouse or touch relative to the stage
    if (tool.name === 'pen') {
    lastLine.points(lastLine.points().concat([pos.x, pos.y])); // Add the new point to the line
    
} else if (tool.name === 'rectangle') {
  var pos = stage.getPointerPosition();
  var x = Math.min(pos.x, startX);
  var y = Math.min(pos.y, startY);
  var width = Math.abs(pos.x - startX);
  var height = Math.abs(pos.y - startY);
  rect.setAttrs({
      x: x,
      y: y,
      width: width,
      height: height
  });
  layer.batchDraw();
}});

  stage.on('mouseup touchend', function(event) {
    if (!isDrawing) {
      return;
    }
    isDrawing = false;
    lastLine = null;
  });

  var penButton = document.getElementById('pen-button');
  penButton.addEventListener('click', function() {
    tool.name = 'pen';
    tool.shapeType = 'line';
  });
  
  var rectButton = document.getElementById('rect-button');
  rectButton.addEventListener('click', function() {
    tool.name = ('rectangle');
    tool.shapeType = ('rect');
  });

  var circleButton = document.getElementById('circle-button');
  circleButton.addEventListener('click', function() {
    tool.name = 'circle';
    tool.shapeType = 'circle';
  });
  
  // Add more buttons for other tools as needed

  var colorPicker = document.getElementById('color-picker');


var strokeWidthSlider = document.getElementById('stroke-width-slider');
var strokeWidthLabel = document.getElementById('stroke-width-label');

// Set the initial label value to the default slider value
strokeWidthLabel.innerHTML = strokeWidthSlider.value;

// Add an event listener to the slider to update the label value
strokeWidthSlider.addEventListener('input', () => {
  strokeWidthLabel.innerHTML = strokeWidthSlider.value;
});

strokeWidthSlider.addEventListener('change', function() {
  tool.size = strokeWidthSlider.value;
});
var FillcolorPicker = document.getElementById('fill-color-picker');




  layer.draw();