// is dragging active
let isDragging = false;

// is shift key pressed
let shiftDown = false;

// the rectangle to show while dragging
var rectangle = undefined;

// rectangle object specify the selected range
let rec = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
}

// rectangle object to draw the box upon dragging
let recDraw = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  style: 'position:absolute;border: 2px dotted black;background: white; opacity:0.5;z-index:100;font-size: 0px'
}


//////// Event Listeners ////////

document.addEventListener('keydown', e => {
  // enable dragging if shift key is pressed
  if (e.shiftKey) {
    shiftDown = true;
  }
});

document.addEventListener('keyup', e => {
  // disable dragging mode upon (any) key is released  
  shiftDown = false;
});

document.addEventListener('mousedown', e => {
  // start dragging-mode if shift key is pressed
  if (shiftDown) {
    isDragging = true;
    rec.startX = rec.endX = recDraw.startX = recDraw.endX = e.pageX;
    rec.startY = rec.endY = recDraw.startY = recDraw.endY = e.pageY;
    e.preventDefault();
  }
});

document.addEventListener('mousemove', e => {
  // show dragging rectangle is drag mode is activated
  if (isDragging) {
    rectangle.style.visibility = 'visible';
    e.preventDefault();

    // Take care that the rectangle is displayed also with negative x or y values
    if (e.pageX >= rec.startX && e.pageY >= rec.startY) {
      //console.log("right bottom")
      recDraw.endX = e.pageX;
      recDraw.endY = e.pageY;
    } else if (e.pageX < rec.startX && e.pageY >= rec.startY) {
      //console.log("left bottom - negative X")
      recDraw.startX = e.pageX;
      recDraw.endX = rec.startX;
      recDraw.endY = e.pageY;
    } else if (e.pageX >= rec.startX && e.pageY < rec.startY) {
      //console.log("right top - negative Y")
      recDraw.endY = rec.startY;
      recDraw.startY = e.pageY;
      recDraw.endX = e.pageX; 
    } else if (e.pageX < rec.startX && e.pageY < rec.startY) {
      //console.log("left top - negative X + negative Y")
      recDraw.startY = e.pageY;
      recDraw.startX = e.pageX;
      recDraw.endX = rec.startX;
      recDraw.endY = rec.startY;
    } 

    drawRectangle();
  }
});

document.addEventListener('mouseup', e => {
  // stop dragging mode if mouse button is released
  if (isDragging) {
    rec.endX = e.pageX;
    rec.endY = e.pageY;
    isDragging = false;
    rectangle.style.visibility = 'hidden';
    checkCheckboxes();
  }
});


//////// Functions ////////

function drawRectangle() {
  rectangle.style.left = `${recDraw.startX}px`;
  rectangle.style.top = `${recDraw.startY}px`;
  rectangle.style.width = `${recDraw.endX - recDraw.startX}px`;
  rectangle.style.height = `${recDraw.endY - recDraw.startY}px`;
}

function checkCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(chckbx => {
      posObject = chckbx.getBoundingClientRect();
      if ((rec.endY >= posObject.top && posObject.top >= rec.startY || rec.endY <= posObject.top && posObject.top <= rec.startY) &&
          (rec.endY >= posObject.bottom && posObject.bottom >= rec.startY || rec.endY <= posObject.bottom && posObject.bottom <= rec.startY) &&
          (rec.endX >= posObject.left && posObject.left >= rec.startX || rec.endX <= posObject.left && posObject.left <= rec.startX) &&
          (rec.endX >= posObject.right && posObject.right >= rec.startX || rec.endX <= posObject.right && posObject.right <= rec.startX)) {
            // toggle status of the checkbox in range
            chckbx.checked ? chckbx.checked = false : chckbx.checked = true;
        }
    });
} 

function initCheckboxSelector() {
  // create div which is used for showing the rectangle and initialize it
  rectangle = document.createElement('div');
  rectangle.style.cssText = recDraw.style;
  document.body.appendChild(rectangle);
}

initCheckboxSelector(); 