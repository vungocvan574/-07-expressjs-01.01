var db = require('../db');
var shortId = require("shortid");

module.exports.create = function(req, res, next) {
  // res.render('transfer/create', {
  //     csrfToken: req.csrfToken()
  // });

  res.render("transfer/create");
  next();
};

module.exports.postCreate = function(req, res, next) {
    req.body.id = shortId.generate();
    var data = {
        id: shortId.generate(),
        userId: req.signedCookies.userId,
        accountId: req.body.accountId,
        amount: parseInt(req.body.amount)
    };

    db.get('transfer').push(data).write();
    res.render('transfer/create');
    next();
};