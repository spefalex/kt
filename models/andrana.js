var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AndranaSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Andrana', AndranaSchema);
