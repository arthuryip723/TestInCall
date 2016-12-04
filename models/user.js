var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean,
  // could be seller or buyer
  role: {type: String, default: 'buyer'},
  people: [{type: Schema.Types.ObjectId, ref: 'Person'}]
}));