'use strict'
require('dotenv').config();
const {
    faker
} = require('@faker-js/faker');
const uuid=require('uuid').v4;

const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/airline`;
console.log(host);
const menegarConnection = io.connect(host);
setInterval(() => {
    const id=uuid();
    let flightInfo = {
        event: 'new-flight',
        time: new Date(),
        Details: {
            airLine: 'Royal Jordanian Airlines',
            destination: faker.address.cityName(),
            pilot: faker.name.findName(undefined, undefined),
            flightID: faker.datatype.hexadecimal(22),
        }
    }
    console.log(`new flight with ID '${flightInfo.Details.flightID}' have been scheduled`);
    menegarConnection.emit('new-flight', flightInfo);
}, 10000);
setTimeout(() => {
    menegarConnection.on('arrived', (payload) => {
        console.log(`we’re greatly thankful for the amazing flight, ${payload.payload.Details.flightID}`);
    })
}, 8000);
