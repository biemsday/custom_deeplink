var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/', {
    extensions: ['html']
}));

http.listen(3000, () => {
    console.log('listening on: 3000');
});