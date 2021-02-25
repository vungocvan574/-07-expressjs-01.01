// var shortId = require('shortid');
// var db = require('../db');

var Product = require('../../model/product.model');

module.exports.index = async function (req, res, next) {
  // var page = parseInt(req.query.page || 1); // Cai nay nap tu UI
  // var perPage = 8;

  // // var begin = (page - 1) * perPage;
  // // var end = page * perPage;

  // var skip = (page - 1) * perPage;
  // res.render('products/index', {
  //     // products: db.get('products').value().slice(begin, end)
  //     products: db.get('products').drop(skip).take(perPage).value()
  // });

    try {
        var currentPage = req.query.p || 2;
        const options = {
            page: currentPage,
            limit: 4,
            collation: {
              locale: 'en',
            },
          };
        var products = await Product.paginate({}, options);

        res.json(products)
    } catch (error) {
        next(error)
    }

  //
};

module.exports.create = async function(req, res, next) {
    try {
        var product = await Product.create(req.body);
        res.json(product);
        
    } catch (error) {
        next(error);
    }
};

// module.exports.productDetail = function (req, res) {
//   var id = req.params.id;
//   var product = db.get("products").find({ id: id }).value();

//   res.render("products/product-detail", {
//     product: product,
//   });
// };

// module.exports.search = function(req, res) {
//     var q = req.query.q;
//     var matchedUsers = db.get('products').filter(function(product) {
//         return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//     });

//     res.render('products/index', {
//         products: matchedUsers
//     });
// };

// module.exports.postCreate = function(req, res) {
//     req.body.id = shortId.generate();

//     db.get('products').push(req.body).write();
//     res.redirect('');
// };