const express = require('express');
const http = require('http');
const cors = require('cors');

//Create server
const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

//Session container
const sessions = {};

// Connection
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    //Create room
    socket.on('create-room', ({ roomId, settings }, callback) => {
        sessions[roomId] = {
            host: socket.id,
            settings,
            players: [],
            problems: [],
            attempts: {}
        };
        socket.join(roomId);
        console.log(`Room created: ${roomId}`);
        if (callback) callback({ success: true });
    });

    //Join room
    socket.on('join-room', ({ roomId, playerId }, callback) => {
        const session = sessions[roomId];
        if (!session) {
            return callback({ error: 'Room not found'});
        }
        session.players.push({ id: socket.id, name: playerId });
        socket.join(roomId);
        io.to(roomId).emit('player-joined', { name: playerId });
        callback({ success: true });
    });

    //Add problem
    socket.on('add-problem', ({ roomId, problemData }, callback) => {
        const session = sessions[roomId];
        if (!session) return callback({error: "Room not found"});

        const problem = problemData;

        session.problems.push(problem);
        session.attempts[problem.id] = {};

        //Broadcast to All clients in room
        io.to(roomId).emit('problem-added', problem);

        callback({ success: true, problem });
    });

    //Submit Attempts
    socket.on('submit-attempt', ({ roomId, problemId, playerId, attempts }, callback) => {
        const session = sessions[roomId];
        if (!session || !session.attempts[problemId]) {
            return callback({ error: "Invalid problem or session" });
        }
        session.attempts[problemId][playerId] = attempts;

        //Broadcast to all clients
        io.to(roomId).emit('attempt-updated', {
            problemId,
            playerId,
            attempts
        });

        callback( { success: true });
    })

    //Disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

//Generate Room Id
function generateRoomId(){
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

app.get('/', (req, res) => {
    res.send('Socket.IO is running');
});

//Listening
server.listen(3000, () => {
    console.log('Server is listening on Port 3000')
});