 
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

require('./database');

var Person = require('./models/person');
var Comment = require('./models/comment');

Person.remove(function(err, pepole) {});
Comment.remove(function(err, commenrts) {});
var alex = new Person({
    name: 'Alex',
    reviews: [{content: 'Alex is great', rating: 3}],
});

var joe = new Person({
    name: 'Joe',
    reviews: [{content: 'Joe is so-so.', rating: 5}],
});

alex.save();
joe.save();
var comment1 = new Comment({
    content: "Alex is great.",
    person: alex._id,
    rating: 3,
});
var comment2 = new Comment({
    content: 'Joe is so-so.',
    person: joe._id,
    rating: 5,
});
comment1.save();
comment2.save();
alex.comments.push(comment1._id);
joe.comments.push(comment2._id);

alex.save();
joe.save();

var aaron = new Person({ 
  name: 'Aaron',
  reviews: [{content: 'Aaron is awesome.', rating: 1}],
});
aaron.save(function(err) {
});
var comment3 = new Comment({
  content: "Aaron is awesome.",
  person: aaron._id,
  rating: 1,
});
comment3.save();
aaron.comments.push(comment3._id);
aaron.save();
