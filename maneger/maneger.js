'use strict'
const events=require('../events/events');
const {faker}=require('@faker-js/faker');

setInterval(()=>{
    let flightInfo={
        event: 'new-flight',
        time: new Date(),
        Details: {
        airLine: 'Royal Jordanian Airlines',
        destination: faker.address.cityName(),
        pilot: faker.name.findName(undefined, undefined),
        flightID: faker.datatype.hexadecimal(22),
    }}
    console.log(`new flight with ID ${flightInfo.Details.flightID} have been scheduled`);
    events.emit('new-flight',flightInfo);
},10000);
setTimeout(() => {
    events.on('arrived',(payload)=>{
        console.log(`we’re greatly thankful for the amazing flight, ${payload.Details.pilot}`);
    })
}, 8000);

