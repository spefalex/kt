var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UtilisateursSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('utilisateurs', UtilisateursSchema);
