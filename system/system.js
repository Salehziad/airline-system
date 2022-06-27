'use strict';
require('dotenv').config();
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);
const airLineConnection = io.of('/airline');
io.on('connection', (socket) => {
    console.log('global connection', socket.id);
    socket.on('new-flight', (payload) => {
        console.log('Flight ', payload);
        airLineConnection.emit('new-flight', payload); // send from global to namespace
    });
});
airLineConnection.on('connection', (socket) => {
    console.log('airline connection', socket.id);
    socket.on('new-flight', (payload) => {
        console.log('Flight ', payload);
        airLineConnection.emit('new-flight', payload)
    });
    socket.on('took-off', takeOff);

    function takeOff(payload) {
        console.log('Flight ', payload);
    }
    socket.on('arrived', arrived);
    function arrived(payload) {
        console.log('Flight ', payload);
        io.emit('arrived', payload); // send from namespace to global
    }
});