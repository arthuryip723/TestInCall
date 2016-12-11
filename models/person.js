var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var personSchema = new Schema({
  name: {type: String, default: 'Amy'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  images: [{type: String}],
});

module.exports = mongoose.model('Person', personSchema);