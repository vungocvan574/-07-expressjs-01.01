var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

productSchema.plugin(mongoosePaginate);

var Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;