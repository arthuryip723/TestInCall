var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

var reviewSchema = new Schema({
  content: String,
  rating: Number,
  // commentSet: { type: Schema.Types.ObjectId, ref: 'CommentSet', default: null },
  comments: [commentSchema],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

var personSchema = new Schema({
  name: { type: String},
  description: { type: String},
  phone: { type: String},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  commentSet: {type: Schema.Types.ObjectId, ref: 'CommentSet'},
  reviews: [reviewSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  gallery: [{ type: String }],
  avatar: { type: String},
  created_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Person', personSchema);