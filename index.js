require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
// var csrf = require('csurf');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(db => console.log(db.connection.host))
        .catch(err => console.error(err));

db = require('./db');

var port = process.env.PORT || 3300;
var app = express();

//Include routers
var userRoute = require('./route/user.route');
var productRoute = require('./route/product.route');
var authRoute = require('./route/auth.route');
var cartRoute = require('./route/cart.route');
var transferRoute = require('./route/transfer.route');

var apiProductRoute = require('./api/route/product.route');

//Include middleware
var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
// app.use(csrf({ cookie: true }));

//Use static file
app.use(express.static('public'));

//Use api route
app.use('/api/products', apiProductRoute);

//Use route
app.use('/users', authMiddleware.requireAuth, userRoute);
// app.use('/users', userRoute);
app.use('/products', authMiddleware.requireAuth, productRoute);
// app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);
app.use('/auth', authRoute);

app.get('/', function(req, res) {
    res.render('index', {
        name: ''
    });
});

app.listen(port, function() {
    console.log('Server is listening to localhost:' + port);
})