'use strict';
const events = require('../events/events');
events.on('new-flight', takeOff);
events.on('new-flight', arrived);

function takeOff(payload) {
    setTimeout(() => {
        payload.event = "took-off";
        payload.time = new Date();
        console.log(`flight with ID ${payload.Details.flightID} took-off`);
        events.emit('took-off', payload)
    }, 4000);
}
function arrived(payload) {
    setTimeout(() => {
        payload.event = "arrived";
        payload.time = new Date();
        console.log(`Pilot: flight with ID ${payload.Details.flightID} has arrived`);
        events.emit('arrived', payload)
    }, 7000);
}