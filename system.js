'use strict';
const events = require('./events/events')
require('./maneger/maneger');
require('./Pilot/pilot');

events.on('new-flight', newFlyght);
function newFlyght(payload) {
    console.log(payload);
}

events.on('took-off', takeOff);
function takeOff(payload) {
    console.log(payload);
}

events.on('arrived',arrived);
function arrived(payload){
    console.log(payload);
}