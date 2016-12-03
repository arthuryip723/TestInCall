var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var commentSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 3},
  content: String,
  person: {
    type: Schema.ObjectId,
    // type: Number,
    ref: 'Person'
  },
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);