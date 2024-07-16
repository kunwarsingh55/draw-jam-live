import { useState, useRef, useEffect, useContext } from 'react';
import ToolBox from './ToolBox';
import SaveLoadComponent from './SaveLoadControls';
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
import { DataContext } from '../Contexts/DataContext';
import axios from 'axios';

function WhiteBoardCanvas() {

  const { sessionId, whiteBoardSession } = useContext(DataContext);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('line');
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [color, setColor] = useState('#000000')
  const [saveMessage, setSaveMessage] = useState('');

  // 1 - Join room with current session ID
  useEffect(() => {
    console.log("Session :", whiteBoardSession);
    if (whiteBoardSession) {
      const sessionId = whiteBoardSession.newSession.sessionId;
      socket.emit('joinRoom', sessionId);
      //console.log("JOINING ROOM WITH ID ----> " + sessionId);
    }
  }, []);

  // Listen for drawing data from other clients
  useEffect(() => {
    socket.on('drawing', (data) => {
      console.log("DATA : ", data.data);
      // dont update itself
      if (JSON.stringify(data.data) != JSON.stringify(shapes))
        setShapes(data.data);
    });

    return () => {
      socket.off('drawing');
    };
  }, []);

  // Emit drawing data to the server
  useEffect(() => {
    // emit only if new shape is drawn
    if (whiteBoardSession && shapes.length > 0 && isUpdated) {
      let roomId = whiteBoardSession.newSession.sessionId;
      socket.emit('drawing', { data: shapes, roomId });
      setIsUpdated(false);
    }
  }, [shapes]);

  // redraw canvas after shape update, either by websocket or user draw
  useEffect(() => {
    redrawCanvas();
  }, [shapes]);




  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;


    // mouse down, draw mode on, initiate new shape
    const startDraw = (e) => {
      const startX = e.clientX - canvas.offsetLeft;
      const startY = e.clientY - canvas.offsetTop;
      setIsDrawing(true);

      ctx.strokeStyle = color;

      if (tool === 'pen') {
        // new line, append starting cordinates, rest will be added as cursor will be dragged
        setCurrentShape({ color: color, type: 'pen', points: [{ x: startX, y: startY }] });
        ctx.beginPath(); // new path
        ctx.moveTo(startX, startY);
      }
      else if (tool === 'erase') {
        // new line, append starting cordinates, rest will be added as cursor will be dragged
        setCurrentShape({ color: '#FFFFFF', type: 'pen', points: [{ x: startX, y: startY }] });
        ctx.beginPath(); // new path
        ctx.moveTo(startX, startY);
      }
      else if (tool === 'rectangle') {
        // new rectangle, append starting x,y .. w, h changes as cirsor is dragged
        setCurrentShape({ color: color, type: 'rectangle', startX, startY, width: 0, height: 0 });
      }
      else if (tool === 'line') {
        // new line, append starting x,y, keep ending x, y same.
        setCurrentShape({ color: color, type: 'line', startX, startY, endX: startX, endY: startY });
        ctx.beginPath();
      }
    };


    // mouse move action, update new points of current shape as cursor moves
    const drawing = (e) => {
      setIsUpdated(true);
      if (!isDrawing || !currentShape) return;

      // current cursor cordinates w.r.t canvas 
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      ctx.strokeStyle = currentShape.color;
      ctx.lineWidth = 5
      if (tool === 'pen') {
        // append new points for line path 
        currentShape.points.push({ x, y });
        //draw on canvas
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      else if (tool === 'erase') {
        // append new points for line path 
        currentShape.points.push({ x, y });
        //draw on canvas
        ctx.strokeStyle = '#FFFFFF'
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
      else if (tool === 'line') {
        // current cursor cordinates
        currentShape.endX = x;
        currentShape.endY = y;

        // change line ending to current cursor point
        setCurrentShape({ ...currentShape, x, y });

        redrawCanvas();
        ctx.beginPath();
        ctx.moveTo(currentShape.startX, currentShape.startY);
        ctx.lineTo(x, y);
        ctx.stroke();
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

  }, [isDrawing, tool, currentShape, shapes, color]);



  // clear old shapes, draw new shape which are updated by moving cursor.
  const redrawCanvas = () => {
    if (!shapes) return;
    if (ctxRef.current == null) return
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas

    shapes.forEach((shape) => {
      ctx.strokeStyle = shape.color;
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
      else if (shape.type === 'line') {
        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.stroke();
      }
    });
  };


  const saveDrawing = async () => {
    const drawingData = JSON.stringify(shapes);
    console.log("Save Drawing : ", drawingData);
    let response = await axios.put('http://localhost:3000/api/sessions',
      {
        sessionData: drawingData,
        sessionId:  whiteBoardSession.newSession.sessionId
      }
    )
    console.log(response.data);
    setSaveMessage("Saved");
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* <div className='flex p-5 m-5 gap-4 text-white'>
        <button onClick={() => setTool('rectangle')} className='bg-purple-600 p-2 rounded-md'>Rectangle</button>
        <button onClick={() => setTool('pen')} className='bg-purple-600 p-2 rounded-md'>Pen</button>
      </div> */}
      <canvas ref={canvasRef} width={700} height={400} className='border border-gray-200 m-10 shadow-lg rounded-[1rem]' />
      <div className='flex gap-5'>
        <ToolBox setTool={setTool} color={color} setColor={setColor} />
        <SaveLoadComponent saveDrawing={saveDrawing} saveMessage={saveMessage}/>
      </div>

    </div>
  );
}

export default WhiteBoardCanvas;

