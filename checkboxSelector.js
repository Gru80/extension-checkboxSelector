// is dragging active
let isDragging = false;

// is shift key pressed
let shiftDown = false;

// the rectangle to show while dragging
var rectangle = undefined;

// coordinates of the rectangle
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

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
    startX = e.pageX;
    startY = e.pageY;
    endX = startX;
    endY = startY;
    e.preventDefault();
  }
});

document.addEventListener('mousemove', e => {
  // show dragging rectangle is drag mode is activated
  if (isDragging) {
    rectangle.style.visibility = 'visible';
    endX = e.pageX;
    endY = e.pageY;
    e.preventDefault();

    rectangle.style.left = `${startX}px`;
    rectangle.style.top = `${startY}px`;
    rectangle.style.width = `${endX - startX}px`;
    rectangle.style.height = `${endY - startY}px`;
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

function checkCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (var i = 0; i < checkboxes.length; i++) {
        posObject = checkboxes[i].getBoundingClientRect();
        if ((endY >= posObject.top && posObject.top >= startY || endY <= posObject.top && posObject.top <= startY) &&
            (endY >= posObject.bottom && posObject.bottom >= startY || endY <= posObject.bottom && posObject.bottom <= startY) &&
            (endX >= posObject.left && posObject.left >= startX || endX <= posObject.left && posObject.left <= startX) &&
            (endX >= posObject.right && posObject.right >= startX || endX <= posObject.right && posObject.right <= startX)) {
              // toggle status of the checkbox in range
              checkboxes[i].checked ? checkboxes[i].checked = false : checkboxes[i].checked = true;
        }
    }
} 

function initMe() {
  // create div which is used for showing the rectangle and initialize it
  rectangle = document.createElement('div');
  rectangle.style.cssText = 'position:absolute;border: 2px dotted black;background: white; opacity:0.5;z-index:100;font-size: 0px';
  document.body.appendChild(rectangle);
}

initMe(); 