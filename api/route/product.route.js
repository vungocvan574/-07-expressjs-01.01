var express = require('express');

var controller = require('../controller/product.controller');
var validate = require('../../validate/product.validate');

var router = express.Router();

router.get('/', controller.index);

router.post("/", controller.create);

// router.get('/search', controller.search);

// router.get("/:id", controller.productDetail);

// router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;