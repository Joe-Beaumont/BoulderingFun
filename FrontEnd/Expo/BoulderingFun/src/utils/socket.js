import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = "http://192.168.1.52:3000";

const socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'],
    autoConnect: true,
});

export default socket;