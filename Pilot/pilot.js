'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/airline`;
const pilotConnection = io.connect(host)

pilotConnection.emit('get')

pilotConnection.on('new-flight', takeOff)
function takeOff(payload) {
    let x=payload.payload.Details.flightID
    console.log({x});
    setTimeout(() => {
        payload.payload.event = "took-off";
        payload.payload.time = new Date();
        console.log(`flight with ID '${payload.payload.Details.flightID}' took-off`);
        pilotConnection.emit('took-off', payload)
    }, 4000);
}

pilotConnection.on('new-flight', arrived)
function arrived(payload) {
    setTimeout(() => {
        payload.payload.event = "arrived";
        payload.payload.time = new Date();
        console.log(`Pilot: flight with ID '${payload.payload.Details.flightID}' has arrived`);
        pilotConnection.emit('arrived', payload)
    }, 7000);
}
pilotConnection.on('xxx',(payload)=>{
    console.log({payload});
    // pilotConnection.emit('got-them',payload)
})