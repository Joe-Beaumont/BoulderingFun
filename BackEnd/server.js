const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const sessions = {};

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('create-room', ({ settings }, callback) => {
        const roomId = generateRoomId();
        session[roomId] = {
            host: socket.id,
            settings,
            players: []
        };
        socket.join(roomId);
        console.log(`Room created: ${roomId}`);
        callback({ roomId });
    });
    socket.on('join-room', ({ roomId, playerName }, callback) => {
        const session = sessions[roomId];
        if (!session) {
            return callback({ error: 'Room not found'});
        }
        session.players.push({ id: socket.id, name: playerName });
        socket.join(roomId);
        io.to(roomId).emit('player-joined', { name: playerName });
        callback({ success: true });
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

function generateRoomId(){
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

app.get('/', (req, res) => {
    res.send('Socket.IO is running');
});

server.listen(3000, () => {
    console.log('Server is listening on Port 3000')
});