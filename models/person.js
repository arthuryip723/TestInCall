var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var personSchema = new Schema({
  name: {type: String, default: 'Amy'},
});

module.exports = mongoose.model('Person', personSchema);