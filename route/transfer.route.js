var express = require("express");

var controller = require("../controller/transfer.controller");
var validate = require('../validate/transfer.validate');

var router = express.Router();

router.get("/create", controller.create);

router.post('/create', validate.postCreate, controller.postCreate)

module.exports = router;