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
  if (e.shiftKey) {
    shiftDown = true;
  }
});

document.addEventListener('keyup', e => {
    shiftDown = false;
});

document.addEventListener('mousedown', e => {
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
  if (isDragging) {
    rectangle.style.visibility = 'visible';
    endX = e.pageX;
    endY = e.pageY;
    e.preventDefault();
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    rectangle.style.visibility = 'hidden';
    checkCheckboxes();
  }

});

function draw() {
  rectangle.style.left = `${startX}px`;
  rectangle.style.top = `${startY}px`;
  rectangle.style.width = `${endX - startX}px`;
  rectangle.style.height = `${endY - startY}px`;
  requestAnimationFrame(draw);
}

function checkCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var candidateCheckboxes = [];
    var allChecked = true;

    for (var i = 0; i < checkboxes.length; i++) {
        posObject = checkboxes[i].getBoundingClientRect();
        if ((endY >= posObject.top && posObject.top >= startY || endY <= posObject.top && posObject.top <= startY) &&
            (endY >= posObject.bottom && posObject.bottom >= startY || endY <= posObject.bottom && posObject.bottom <= startY) &&
            (endX >= posObject.left && posObject.left >= startX || endX <= posObject.left && posObject.left <= startX) &&
            (endX >= posObject.right && posObject.right >= startX || endX <= posObject.right && posObject.right <= startX)) {

              if (checkboxes[i].checked === false) {
                allChecked = false;
            }
            //add the checkbox to the list of inputs within the selection
            candidateCheckboxes.push(checkboxes[i]);
        }
    }

    //iterate through all checkbox inputs in the selection
    for (var i = 0; i < candidateCheckboxes.length; i++) {
        //if every checkbox in the selection is checked, uncheck all of them
        if (allChecked) {
            candidateCheckboxes[i].checked = false;
        }
        //otherwise check all boxes in selection
        else {
            candidateCheckboxes[i].checked = true;
        }
    }
} 

function initMe() {
  rectangle = document.createElement('div');
  rectangle.style.cssText = 'position:absolute;border: 2px dotted black;background: white; opacity:0.5;z-index:100;font-size: 0px';
  document.body.appendChild(rectangle);
  requestAnimationFrame(draw);
}

initMe(); 