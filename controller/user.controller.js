const md5 = require('md5');
var shortId = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.create = function(req, res) {
    res.render('users/create')
};

module.exports.userDetail = function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();

    res.render('users/user-detail', {
        user: user
    });
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortId.generate();
    req.body.email = "";
    req.body.password = md5("123456");
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    db.get('users').push(req.body).write();
    res.redirect('/users');
};