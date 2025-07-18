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

//room container
const rooms = {};

// Connection
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    //Create room
    socket.on('create-room', ({ roomId, settings }, callback) => {
        rooms[roomId] = {
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
        const room = rooms[roomId];
        if (!room) {
            return callback({ error: 'Room not found'});
        }

        if (room.players.length >= Number(room.settings.playerCount)){
            return callback({ error: 'Room is full'});
        }
        room.players.push({ id: socket.id, name: playerId });
        socket.join(roomId);
        io.to(roomId).emit('player-joined', { name: playerId });
        callback({ success: true });
    });

    //Add problem
    socket.on('add-problem', ({ roomId, problemData }, callback) => {
        const room = rooms[roomId];
        if (!room) return callback({error: "Room not found"});

        const problem = problemData;

        room.problems.push(problem);
        room.attempts[problem.id] = {};

        //Broadcast to All clients in room
        io.to(roomId).emit('problem-added', problem);

        callback({ success: true, problem });
    });

    //Submit Attempts
    socket.on('submit-attempt', ({ roomId, problemId, playerId, attempts }, callback) => {
        const room = rooms[roomId];
        if (!room || !room.attempts[problemId]) {
            return callback({ error: "Invalid problem or room" });
        }
        room.attempts[problemId][playerId] = attempts;

        //Broadcast to all clients
        io.to(roomId).emit('attempt-updated', {
            problemId,
            playerId,
            attempts
        });

        if(callback) callback( { success: true });
    })

    //Disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

    //Check Room Exists
    socket.on('check-room-exists', (roomId, callback) => {
        const roomExists = rooms.has(roomId);
        callback({ exists: roomExists})
    });

    //Scoring
    socket.on('end-session', ({ roomId }, callback) => {
        const room = rooms[roomId];
        if (!room) {
            return callback ({ error: 'Room does not exist' });
        }

        const { problems, players, attempts } = room;

        //score calculation
        const scores = players.map(player => {
            let totalScore = 0;

            problems.forEach(problem => {
                const attempt = attempts?.[problem.id]?.[player.id];

                let score = 0;

                if (attempt === "Incomplete"){
                    if (problem.hasZone && problem.zoneReached?.[player.id]){
                        score = 30;
                    } else {
                        score = 0;
                    }
                } else   if (attempt === "1") score = 100;
                    else if (attempt === "2") score = 70;
                    else if (attempt === "3") score = 40;
                    else score = 10;

                totalScore += score;
            });

            return {
                playerId: player.id,
                name: player.name,
                score: totalScore,
            };
        });

        scores.sort((a, b) => b.score - a.score);

        io.to(roomId).emit('session-ended', { scores });

        callback({ success: true })
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