// is dragging active
let isDragging = false;

// is shift key pressed
let shiftDown = false;

// the rectangle to show while dragging
var rectangle = undefined;

// rectangle object to draw the box upon dragging
let rec = {
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
    rec.startX = rec.endX = e.pageX;
    rec.startY = rec.endY = e.pageY;
    e.preventDefault();
  }
});

document.addEventListener('mousemove', e => {
  // show dragging rectangle is drag mode is activated
  if (isDragging) {
    rectangle.style.visibility = 'visible';
    rec.endX = e.pageX;
    rec.endY = e.pageY;
    e.preventDefault();
    drawRectangle();

  }
});

document.addEventListener('mouseup', () => {
  // stop dragging mode if mouse button is released
  if (isDragging) {
    isDragging = false;
    rectangle.style.visibility = 'hidden';
    checkCheckboxes();
  }
});


//////// Functions ////////

function drawRectangle() {
  rectangle.style.left = `${rec.startX}px`;
  rectangle.style.top = `${rec.startY}px`;
  rectangle.style.width = `${rec.endX - rec.startX}px`;
  rectangle.style.height = `${rec.endY - rec.startY}px`;
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

function initMe() {
  // create div which is used for showing the rectangle and initialize it
  rectangle = document.createElement('div');
  rectangle.style.cssText = rec.style;
  document.body.appendChild(rectangle);
}

initMe(); 