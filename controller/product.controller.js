var shortId = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page || 1); //n
    var perPage = 8;

    // var begin = (page - 1) * perPage;
    // var end = page * perPage;

    var drop = (page - 1) * perPage;
    res.render('products/index', {
        // products: db.get('products').value().slice(begin, end)
        products: db.get('products').drop(drop).take(perPage).value()
    });
};

module.exports.create = function(req, res) {
    res.render('products/create')
};

module.exports.userDetail = function(req, res) {
    var id = req.params.id;
    var product = db.get('products').find({ id: id }).value();

    res.render('products/product-detail', {
        product: product
    });
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('products').filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('products/index', {
        products: matchedUsers
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortId.generate();

    db.get('products').push(req.body).write();
    res.redirect('');
};