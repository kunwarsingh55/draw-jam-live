const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/Auth');
const apiRoutes = require('./routes/Api');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: 'https://draw-jam-frontend.vercel.app/',
    },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//i2jhhQ0IEl3ADGrS
// MongoDB connection
const mongoURI = 'mongodb+srv://kpsingh:i2jhhQ0IEl3ADGrS@cluster0.s7blixd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = 3000;

app.get("/", (req, res) => {
    res.end("ONLINE");
});

// Socket Management
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`\n\n\n\nUser ${socket.id} joined room ${roomId}`);
    });

    socket.on('drawing', (data) => {
        // Send drawing data to all clients in the same room
        io.to(data.roomId).emit('drawing', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// 404 route handler
app.all('*', (req, res) => {
    res.status(404).json({ msg: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler : ", err);
    res.status(500).json({ msg: "Internal Server Error" });
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
