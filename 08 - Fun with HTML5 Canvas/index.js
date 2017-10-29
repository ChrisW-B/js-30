const canvas = document.querySelector(`#draw`);
const ctx = canvas.getContext(`2d`);

let isDrawing = false;
let lastX;
let lastY;
let hue = 0;
let direction = false;

const setupCanvas = (h, w) => {
  canvas.width = w;
  canvas.height = h;

  ctx.lineWidth = 40;
  ctx.strokeStyle = `#BADA55`;
  ctx.lineJoin = `round`;
  ctx.lineCap = `round`;
};

function draw({ offsetX, offsetY }) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%`;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
  [lastX, lastY] = [offsetX, offsetY];
  hue += 2;
  if (hue > 360) hue -= 360;
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) direction = !direction;
  if (direction) ctx.lineWidth += 1;
  else ctx.lineWidth -= 1;
}

canvas.addEventListener(`mousedown`, ({ offsetX, offsetY }) => {
  isDrawing = true;
  [lastX, lastY] = [offsetX, offsetY];
});

canvas.addEventListener(`mousemove`, draw);
canvas.addEventListener(`mouseup`, () => isDrawing = false);
canvas.addEventListener(`mouseout`, () => isDrawing = false);
window.addEventListener(`resize`, () => setupCanvas(window.innerHeight, window.innerWidth));
setupCanvas(window.innerHeight, window.innerWidth);