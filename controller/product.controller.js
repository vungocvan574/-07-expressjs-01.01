// var shortId = require('shortid');
// var db = require('../db');

var Product = require('../model/product.model');

module.exports.index = async function(req, res, next) {
    // Doan nay lam viec chua co server
    // var pages = parseInt(req.query.page || 1); //n
    // var perPage = 8;

    // // var firstIndex = (pages - 1) * perPage;
    // // var lastIndex = pages * perPage;

    // var drop = (pages - 1) * perPage// bo qua trang 0
    // res.render('products/index', {
    //     // products: db.get('products').value().slice(firstIndex, lastIndex)
    //     products: db.get('products').drop(drop).take(perPage).value()
    // });
    //
    
    // try {
    //     var page = parseInt(req.query.page) || 1;
    //     const limit = 8;

    //     var firstItem = (page - 1) * limit;
    //     var lastItem = page * limit;
    //     // var skip = (page - 1) * limit;

    //     var allProducts = await Product.find();

    //     var products = allProducts.slice(firstItem, lastItem);
        
    //     res.render('products/index', {
    //         products: products,
    //         current: page,
    //         pages: Math.ceil(allProducts.length / limit)
    //     });
    // } catch (error) {
    //     next(error)
    // }

    try {
        var currentPage = req.query.p || 1
        const options = {
            page: currentPage,
            limit: 4,
            collation: {
              locale: 'en',
            },
          };
        var products = await Product.paginate({}, options);

        res.render('products/index', {
            products: products,
        });
    } catch (error) {
        next(error)
    }

};



module.exports.create = function(req, res) {
    res.render('products/create')
};

module.exports.productDetail = function(req, res) {
    var id = req.params.id;
    var product = Product.find({ id: id }).value();

    res.render("products/product-detail", {
        product: product,
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