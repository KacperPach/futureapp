const express = require('express');
const path = require('path');

const PORT = 8888;
const app = express();

console.log('running on: 127.0.0.1:' + PORT);

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'))
} );