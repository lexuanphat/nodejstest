const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');
const path = require('path');
const port = process.env.port || 3030;

const sslServer = https.createServer({
    'key': fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);

// Now let's create a server that will listen to our port.
const server = sslServer.listen(`${port}`, () => {
    console.log(`Server started on port ${port}`);
    // Connect to our database.
    // connection.connect();
});

// Intialize Socket
const io = require("socket.io")(server, {
    cors : { origin : "*" }
});

// Setup Socket IO.
io.on('connection', (socket) => {
    console.log('Client connected!');
    socket.on('send data', (msg) => {
        io.emit('send data', msg);
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });

});

