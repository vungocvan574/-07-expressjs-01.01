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
    var matchedUsers = db.get('users').filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('');
};