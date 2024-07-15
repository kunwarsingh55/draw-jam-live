const express = require('express')
const authRoutes = require('./routes/Auth');
const apiRoutes = require('./routes/Api');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


const PORT = 3000;


app.get("/", (req, res)=>{
    res.end("ONLINE");
})

// 404 route handler
app.all('*', (req, res)=>{
    res.status(404).json({msg:"Route not found"});
})

// Global error handler
app.use((err, req, res, next)=>{
    console.error("Global Error Handler : ", err);
    res.status(500).json({msg:"Internal Server Error"});
})

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})
