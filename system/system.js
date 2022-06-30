'use strict';
require('dotenv').config();
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);
const airLineConnection = io.of('/airline');
const uuid=require('uuid').v4;
const queue ={
    flights:{

    }
}
airLineConnection.on('connection', (socket) => {
    // console.log('global connection', socket.id);
    socket.on('new-flight', (payload) => {
        console.log('Flight ', payload);
        const id=uuid();
        queue.flights[id]=payload;
        let x=queue
        // console.log({x});
        // airLineConnection.emit('new-flight', queue.flights); // send from global to namespace
        airLineConnection.emit('new-flight', {
            id: id,
            payload: queue.flights[id]
        });
    });
    socket.on('get', () => {
        // console.log({arr});
    airLineConnection.emit('xxx', queue.flights); // send from global to namespace
    })


    // console.log('airline connection', socket.id);
    // socket.on('new-flight', (payload) => {
    //     // console.log('Flight ', payload);
    //     airLineConnection.emit('new-flight', payload)
    // });
    socket.on('took-off', takeOff);

    function takeOff(payload) {
        console.log('Flight ', payload);
    }
    socket.on('arrived', arrived);

    function arrived(payload) {
        console.log('Flight ', payload);
        io.emit('arrived', payload);
        // delete queue.flights; // send from namespace to global
        let x=payload.id
        // console.log({x});
        delete queue.flights[payload.id];
        // console.log({queue});
    }
    socket.on('got-them',(payload)=>{
        // console.log(payload.id);
        Object.keys(queue.flights).forEach((id)=>{
            
            delete queue.flights[payload.id];
        })
        // console.log('222222222222222222222',{queue});
    })
});