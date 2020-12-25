var express = require('express');
var shortId = require('shortid');

var db = require('../db');
var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/cookie', function(req, res, next) {
    res.cookie('user-id', 12345);
    res.send('hello');
});

router.get('/create', controller.create);

router.get('/:id', controller.userDetail);

router.get('/search', controller.search);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;