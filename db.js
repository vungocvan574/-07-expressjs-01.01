var low = require('lowdb'); //
var FileSync = require('lowdb/adapters/FileSync'); //
const adapter = new FileSync('db.json'); //

var db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({
        users: [],
        products: []
    })
    .write();

module.exports = db;