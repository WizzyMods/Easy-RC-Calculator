import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for simplicity in this demo, restrict in prod
        methods: ["GET", "POST"]
    }
});

let activeUsers = 0;

io.on('connection', (socket) => {
    activeUsers++;
    console.log('User connected. Total:', activeUsers);

    // Send initial count
    socket.emit('userCount', activeUsers);

    socket.on('disconnect', () => {
        activeUsers--;
        console.log('User disconnected. Total:', activeUsers);
    });
});

// Broadcast count every 5 seconds as requested
setInterval(() => {
    io.emit('userCount', activeUsers);
}, 5000);

const PORT = 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`WebSocket server running on port ${PORT} (0.0.0.0)`);
});
