//const rectangle = document.getElementById('rectangle');

let isDrawing = false;
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

document.addEventListener('mousedown', e => {
  isDrawing = true;
  startX = e.pageX;
  startY = e.pageY;
  endX = startX;
  endY = startY;
});

document.addEventListener('mousemove', e => {
  if (isDrawing) {
    rectangle.style.visibility = 'visible';
    endX = e.pageX;
    endY = e.pageY;
  }
});

document.addEventListener('mouseup', () => {
  isDrawing = false;
  rectangle.style.visibility = 'hidden';

});

function draw() {
  rectangle.style.left = `${startX}px`;
  rectangle.style.top = `${startY}px`;
  rectangle.style.width = `${endX - startX}px`;
  rectangle.style.height = `${endY - startY}px`;
  requestAnimationFrame(draw);
}

var rectangle = document.createElement('div');
rectangle.style.cssText = 'position:absolute;border: 2px dotted black;background: white; opacity:0.5;z-index:100;font-size: 0px';
document.body.appendChild(rectangle);

requestAnimationFrame(draw);
