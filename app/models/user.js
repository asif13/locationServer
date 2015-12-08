var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String
	lat : String
	lon : String
});
module.exports = mongoose.model('User',UserSchema);
