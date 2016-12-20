var mongoose = require('mongoose')
	,Schema	= mongoose.Schema;

var comment = new Schema({
	content: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	}
});

var commentSetSchema = new Schema({
	comments: [comment],
});