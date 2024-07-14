const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;

// current draw tool
let tool = 'rectangle';

// Store all shapes (lines and rectangles)
let shapes = [];

// to keep track of current drawn shap, thn push it to shapes array
let currentShape = null;


function setTool(selectedTool) {
    tool = selectedTool;
}


function startDraw(e) {
    isDrawing = true;

    // get mouse cordinates wrespect to canvas
    const startX = e.clientX - canvas.offsetLeft;
    const startY = e.clientY - canvas.offsetTop;


    if (tool === 'pen') {
        currentShape = { type: 'pen', points: [{ x: startX, y: startY }] };
        ctx.beginPath(); // always reset to draw new path
    } else if (tool === 'rectangle') {
        currentShape = { type: 'rectangle', startX, startY, width: 0, height: 0 };
    } else if (tool === 'line') {
        currentShape = { type: 'line', startX, startY, endX: startX, endY: startY };
        ctx.beginPath();
    }
}

function drawing(e) {
    if (!isDrawing) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    if (tool === 'pen') {
        currentShape.points.push({ x, y }); // ppush in incoming points of line
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (tool === 'rectangle') {
        const width = x - currentShape.startX;
        const height = y - currentShape.startY;
        currentShape.width = width;
        currentShape.height = height;
        redrawCanvas();
        ctx.strokeRect(currentShape.startX, currentShape.startY, width, height);
    } else if (tool === 'line'){
        currentShape.endX = x;
        currentShape.endY = y;
        redrawCanvas();
        ctx.beginPath();
        ctx.moveTo(currentShape.startX, currentShape.startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopDraw() {
    if (!isDrawing) return;
    isDrawing = false;
    shapes.push(currentShape);
    currentShape = null;
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const shape of shapes) {
        if (shape.type === 'pen') {
            ctx.beginPath();
            ctx.moveTo(shape.points[0].x, shape.points[0].y);
            for (const point of shape.points) {
                ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();
        } else if (shape.type === 'rectangle') {
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
    }
}

function deleteLastShape() {
    shapes.pop(); // Remove the last shape
    redrawCanvas();
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);