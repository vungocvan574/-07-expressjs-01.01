require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser')

db = require('./db');

var port = 3000;
var app = express();

//Include routers
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

//Include middleware
var authMiddleware = require('./middleware/auth.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

//Use static file
app.use(express.static('public'));

//Use routes
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Ilya'
    });
});

app.listen(port, function() {
    console.log('Server is listening to localhost:' + port);
})