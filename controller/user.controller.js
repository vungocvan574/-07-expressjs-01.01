const md5 = require('md5');
// var shortId = require('shortid');
var db = require('../db');

var User = require("../model/user.model");

module.exports.index = async function (req, res) {
  var users = await User.find();
  res.render("users/index", {
    users: users,
  });
};

module.exports.create = function(req, res) {
    res.render('users/create')
};

module.exports.userDetail = async function (req, res) {
  var id = req.params.id;
  var user = await User.findById(id);
  //   var user = db.get("users").find({ id: id }).value();

  res.render("users/user-detail", {
    user: user,
  });
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    // var matchedUsers = db.get('users').value().filter(function(user) {
    //     return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    // });

    try {
      var matchedUsers = await User.find().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
  
      res.render('users/index', {
          users: matchedUsers
      });
    } catch (error) {
      
    }
};

module.exports.postCreate = function(req, res) {
    // req.body.id = shortId.generate();
    req.body.email = "";
    req.body.password = md5("123456");
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    // db.get('users').push(req.body).write();

    res.redirect('/users');
};