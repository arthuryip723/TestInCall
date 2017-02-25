
// var seeder = require('mongoose-seed');

// // Connect to MongoDB via Mongoose
// seeder.connect('mongodb://localhost/incall', function() {

//     // Load Mongoose models
//     seeder.loadModels([
//         'models/person.js',
//     ]);

//     // Clear specified collections
//     seeder.clearModels(['Person',], function() {

//         // Callback to populate DB once collections have been cleared
//         seeder.populateModels(data);

//     });
// });

// // Data array containing seed data - documents organized by Model
// var data = [
//     {
//         'model': 'Person',
//         'documents': [
//             {
//                 'name': 'name1'
//             },
//             {
//                 'name': 'name2'
//             }
//         ]
//     }
// ];
var mongoose = require('./database');

var Person = require('./models/person');
var Comment = require('./models/comment');
var User = require('./models/user');
var Review = require('./models/review');

Person.remove(function(err, pepole) {});
Comment.remove(function(err, comments) {});
User.remove(function(err, users) {});
Review.remove(function(err, reviews) {});

var buyer1 = new User({
  name: 'buyer1',
  password: 'buyer1',
  role: 'buyer',
});
var buyer2 = new User({
  name: 'buyer2',
  password: 'buyer2',
  role: 'buyer',
});

var seller1 = new User({
  name: 'seller1',
  password: 'seller1',
  role: 'seller',
});

buyer1.save();
buyer2.save();
seller1.save();

var alex = new Person({
    name: 'Alex',
    /*reviews: [{content: 'Alex is great', rating: 3, author: buyer1._id, comments: [
      {content: "You're right.", author: buyer2._id},
      {content: "Thank you.", author: buyer1._id},
    ],}],*/
    user: seller1._id,
});

var joe = new Person({
    name: 'Joe',
    // reviews: [{content: 'Joe is so-so.', rating: 5, author: buyer1._id}],
    user: seller1._id,
});

alex.save();
joe.save();
seller1.people.push(alex._id);
seller1.people.push(joe._id);

// alex.reviews.push({content: 'Alex is bad.', rating: 1});
// alex.save();
var review1 = new Review({
    content: "Alex is great.",
    person: alex._id,
    author: buyer1._id,
    rating: 5,
    faceRating: 1,
    figureRating: 2,
    serviceRating: 3,
    priceRating: 4,
    pprRating: 5,
});
var review2 = new Review({
    content: 'Joe is so-so.',
    person: joe._id,
    author: buyer2._id,
    rating: 1,
    faceRating: 5,
    figureRating: 4,
    serviceRating: 3,
    pricerat: 2,
    pprRating: 1,
});
review1.save();
review2.save();
alex.reviews.push({rating: review1.rating, review: review1._id});
joe.reviews.push({rating: review2.rating, review: review2._id});

alex.save();
joe.save();

var comment1 = new Comment({
  content: "I agreed.",
  review: review1._id,
  author: buyer2._id,
});

var comment2 = new Comment({
  content: "I disagreed.",
  review: review2._id,
  author: buyer1._id,
});

comment1.save();
comment2.save();

review1.comments.push(comment1);
review2.comments.push(comment2);
review1.save();
review2.save();

// console.log("-----------------");

// var aaron = new Person({
//   name: 'Aaron',
//   reviews: [{content: 'Aaron is awesome.', rating: 1}],
// });
// aaron.save(function(err) {
// });
// var comment3 = new Comment({
//   content: "Aaron is awesome.",
//   person: aaron._id,
//   rating: 1,
// });
// comment3.save();
// aaron.comments.push(comment3._id);
// aaron.save();

mongoose.connection.close()
