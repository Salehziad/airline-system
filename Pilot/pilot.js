'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/airline`;
const pilotConnection = io.connect(host)
pilotConnection.on('new-flight', takeOff)

function takeOff(payload) {
    setTimeout(() => {
        payload.event = "took-off";
        payload.time = new Date();
        console.log(`flight with ID '${payload.Details.flightID}' took-off`);
        pilotConnection.emit('took-off', payload)
    }, 4000);
}

pilotConnection.on('new-flight', arrived)
function arrived(payload) {
    setTimeout(() => {
        payload.event = "arrived";
        payload.time = new Date();
        console.log(`Pilot: flight with ID '${payload.Details.flightID}' has arrived`);
        pilotConnection.emit('arrived', payload)
    }, 7000);
}