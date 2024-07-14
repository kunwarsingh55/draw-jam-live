import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('line');
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;


    // mouse down, draw mode on, initiate new shape
    const startDraw = (e) => {
      const startX = e.clientX - canvas.offsetLeft;
      const startY = e.clientY - canvas.offsetTop;
      setIsDrawing(true);

      if (tool === 'pen') {
        // new line, append starting cordinates, rest will be added as cursor will be dragged
        setCurrentShape({ type: 'pen', points: [{ x: startX, y: startY }] });
        ctx.beginPath(); // new path
      }
      else if (tool === 'rectangle') {
        // new rectangle, append starting x,y .. w, h changes as cirsor is dragged
        setCurrentShape({ type: 'rectangle', startX, startY, width: 0, height: 0 });
      }
    };


    // mouse move action, update new points of current shape as cursor moves
    const drawing = (e) => {
      if (!isDrawing || !currentShape) return;

      // current cursor cordinates w.r.t canvas 
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;

      if (tool === 'pen') {
        // append new points for line path 
        currentShape.points.push({ x, y });

        //draw on canvas
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      else if (tool === 'rectangle') {

        // cordinates to bottom corner of rectangle, relative to starting point
        const width = x - currentShape.startX;
        const height = y - currentShape.startY;

        // set new point of rect.
        setCurrentShape({ ...currentShape, width, height });

        // clear old
        redrawCanvas();

        // preview new
        ctx.strokeRect(currentShape.startX, currentShape.startY, width, height);
      }
    };

    // mouse up action, draw mode off, append last drawn shape to shapes array
    const stopDraw = () => {
      if (!isDrawing) return;
      setIsDrawing(false);

      if (currentShape) {
        setShapes((prevShapes) => [...prevShapes, currentShape]);
        setCurrentShape(null);
      }
    };

    // listeners
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDraw);


    // cleanup
    return () => {
      canvas.removeEventListener('mousemove', drawing);
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mouseup', stopDraw);
    };

  }, [isDrawing, tool, currentShape]);

  // useEffect(() => {
  //   console.log(shapes);
  // }, [shapes]);

  // clear old shapes, draw new shape which are updated by moving cursor.
  const redrawCanvas = () => {

    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas

    shapes.forEach((shape) => {
      if (shape.type === 'pen') {
        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        shape.points.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      }
      else if (shape.type === 'rectangle') {
        ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
      }
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
      <div className='flex p-5 m-5 gap-4 text-white'>
        <button onClick={() => setTool('rectangle')} className='bg-purple-600 p-2 rounded-md'>Rectangle</button>
        <button onClick={() => setTool('pen')} className='bg-purple-600 p-2 rounded-md'>Pen</button>
      </div>
      <canvas ref={canvasRef} width={500} height={500} className='border border-black' />
    </div>
  );
}

export default App;
