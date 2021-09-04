const { RSA_PKCS1_PSS_PADDING } = require('constants');
const express = require('express');
const http = require('http');
const io = require('socket.io')(3000, {cors: {origin: '*'}});

const app = express();
const server = http.createServer(app);

const PORT = 3001;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

let grid = new Array(4000);
grid.fill(0);

io.on('connection', (socket) => {
    console.log('Socket connected!');
    

    socket.emit('init', {grid: grid});

    socket.on('message', data => {
        io.emit('message', data);

        grid = data.grid;
    });
});
