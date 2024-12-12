import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';
dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("message", ({ message, room }) => {
        console.log(message);
        socket.to(room).emit("receive message", message);
    })
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})

const PORT = process.env.PORT || 3000;
const url = process.env.MONGOURI;
mongoose.connect(url).then(() => {
    console.log("Connected to the database");
    server.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
})