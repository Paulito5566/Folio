const stage = new Konva.Stage({
    container: 'container', // Specify the ID of the container element
    width: window.innerWidth, // Set the stage width
    height: window.innerHeight // Set the stage height
  });
  
  const layer = new Konva.Layer();

  stage.add(layer); // Add the layer to the stage
  
  const tool = {
    name: 'pen',
    shapeType: 'line',
    color: 'black',
    size: 5
  };
  let isDrawing = false;
  let lastLine;
  
  stage.on('mousedown touchstart', function(event) {
    const pos = stage.getPointerPosition(); // Get the position of the mouse or touch relative to the stage
    if (tool.name === 'pen') {
      isDrawing = true;
      lastLine = new Konva.Line({
        stroke: tool.color,
        strokeWidth: tool.size,
        points: [pos.x, pos.y]
      });
    } else if (tool.name === 'rectangle') {
        isDrawing = true;
        lastShape = new Konva.Rect({
          stroke: tool.color,
          strokeWidth: tool.size,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0
        });
      }
      layer.add(lastLine); // Add the line to the layer
  });


  stage.on('mousemove touchmove', function(event) {
    if (!isDrawing) {
      return;
    }
    const pos = stage.getPointerPosition(); // Get the position of the mouse or touch relative to the stage
    if (tool.name === 'pen') {
    lastLine.points(lastLine.points().concat([pos.x, pos.y])); // Add the new point to the line
} else if (tool.name === 'rectangle') {
    const width = pos.x - lastShape.x();
    const height = pos.y - lastShape.y();
    lastShape.width(width);
    lastShape.height(height);
  }
    layer.batchDraw(); // Update the layer
  });

  stage.on('mouseup touchend', function(event) {
    if (!isDrawing) {
      return;
    }
    isDrawing = false;
    lastLine = null;
  });

  const penButton = document.getElementById('pen-button');
  penButton.addEventListener('click', function() {
    tool.name = 'pen';
    tool.shapeType = 'line';
  });
  
  const rectButton = document.getElementById('rect-button');
  rectButton.addEventListener('click', function() {
    tool.name = 'rectangle';
    tool.shapeType = 'rect';
  });

  const circleButton = document.getElementById('circle-button');
  rectButton.addEventListener('click', function() {
    tool.name = 'circle';
    tool.shapeType = 'circle';
  });
  
  // Add more buttons for other tools as needed

  const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('change', function() {
  tool.color = colorPicker.value;
});

const sizeSelector = document.getElementById('size-selector');
sizeSelector.addEventListener('change', function() {
  tool.size = parseInt(sizeSelector.value, 10);
});


  layer.draw();