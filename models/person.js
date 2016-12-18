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
  name: { type: String, default: 'Amy' },
  description: { type: String, default: "I'm gorgeous." },
  phone: { type: String, default: '123-456-7890' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  commentSet: {type: Schema.Types.ObjectId, ref: 'CommentSet'},
  reviews: [reviewSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  gallery: [{ type: String }],
  avatar: { type: String, default: 'default.jpg' },
});

module.exports = mongoose.model('Person', personSchema);