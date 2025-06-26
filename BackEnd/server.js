const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');


//Create server
const app = express();
const server = http.createServer(app);

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

    //Join room
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

    //Add problem
    socket.on('add-problem', ({ roomId, runData }, callback) => {
        const session = sessions[roomId];
        if (!session) return callback({error: "Room not found"});

        const problemId = generateProblemId();
        const problem = { id: problemId, ...problemData};

        session.problems.push(problem);
        session.attempts[problemId] = {}

        //Broadcast to All clients in room
        io.to(roomId).emit('run-added', problem);

        callback({ success: true, problem });
    });

    //Submit Attempts
    socket.on('submit-attempts', ({ roomId, problemId, playerId, attempts }, callback) => {
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