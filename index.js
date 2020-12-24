var express = require('express');

var app = express();

var port = 3000;

app.get('/', function(req, res) {
    res.send('Hello world')
});

app.listen(port, function() {
    console.log('Server is listening to //localhost:' + port);
})