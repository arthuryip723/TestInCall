var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  person: {
    type: Schema.ObjectId,
    // type: Number,
    ref: 'Person'
  },
});

module.exports = mongoose.model('Comment', commentSchema);