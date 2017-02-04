var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var reviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 3},
  faceRating: {type: Number, min: 1, max: 5, default: 3},
  figureRating: {type: Number, min: 1, max: 5, default: 3},
  serviceRating: {type: Number, min: 1, max: 5, default: 3},
  priceRating: {type: Number, min: 1, max: 5, default: 3},
  pprRating: {type: Number, min: 1, max: 5, default: 3},
  content: String,
  person: {
    type: Schema.Types.ObjectId,
    // type: Number,
    ref: 'Person',
  },
  author: {
  	type: Schema.Types.ObjectId,
  	ref: 'User',
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Review', reviewSchema);
