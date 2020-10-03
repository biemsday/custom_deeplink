const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/basova_yana', function(req, res) {
    res.sendFile(path.join(__dirname + '/basova_yana/index.html'))
});

app.get('/svet_dyak', function(req, res) {
    res.sendFile(path.join(__dirname + '/svet_dyak/index.html'))
});

app.listen(port, () => console.log(`istening on port ${port}!`));