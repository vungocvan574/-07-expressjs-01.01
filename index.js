var express = require('express');

db = require('./db');

var port = 3000;
var app = express();

//Include routers
var userRoute = require('./routes/user.route')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Use static file
app.use(express.static('public'));

//Use routes
app.use('/users', userRoute);

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Ilya'
    });
});

app.listen(port, function() {
    console.log('Server is listening to localhost:' + port);
})