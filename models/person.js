var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var Review = new Schema({
  content: String,
  rating: Number,
});

var personSchema = new Schema({
  name: { type: String, default: 'Amy' },
  description: { type: String, default: "I'm gorgeous." },
  phone: { type: String, default: '123-456-7890' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  reviews: [Review],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  gallery: [{ type: String }],
  avatar: { type: String, default: 'default.jpg' },
});

module.exports = mongoose.model('Person', personSchema);