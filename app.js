var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var dl_service = require('./deeplinks/template/service.js')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/', {
    extensions: ['html']
}));

io.on('connection', (socket) => {
    socket.on('generate_link', (user_profile) => {
        dl_service.generate(user_profile)
        var data = dl_service.clear_name
        io.emit('server_collback', data);
    });
});

http.listen(3000, () => {
    console.log('listening on: 3000');
});