var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/* GET home page. */

var url = 'mongodb://localhost:27017/Employee';
var data = [""];

var db = mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to Connect to Database Server', err);
  } else {
    console.log('Connection Established to Database Server');
  }
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: false },//
  password: { type: String, required: true },
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});
var User = mongoose.model('User', userSchema);

router.get('/findAll',function(req,res){
  User.find({}, function(err, users) {
    if (err) throw err;
    // object of all the users
    console.log("Find All");
    console.log(users);
    //data = users;
    res.render('index', {
      title: 'CRUD PROGRAMMING',
      remote:users
    });
  });
});

router.post('/findBy',function(req,res,next){
  var n = req.body.name;
  console.log(n);
  User.findOne({ username: n }, function(err, user) {
    if (err)
      throw err;
    // object of the user
    console.log("Found");
    console.log(user);
  //  console.log(user.username);
    res.render('index', {
      title: 'CRUD PROGRAMMING',
      remote:[""]
    });
  });
});

router.post('/create',function(req,res){
  var newUser = User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  // save the user
  newUser.save(function(err) {
    if (err)
      throw err;
    console.log('User created!');
    res.render('index', { title: 'CRUD PROGRAMMING',
      remote:[""] });
  });
});

router.post('/update',function(req,res){
  var usn = req.body.name;
  var newn = req.body.newname;
  console.log(newn);
  User.findOneAndUpdate({ name: usn }, { name: newn }, function(err, user) {
    if (err) throw err;
    // we have the updated user returned to us
    console.log("Updated");
    console.log(user);
    res.render('index', { title: 'CRUD PROGRAMMING',
      remote:[""]});
  });
});

router.post('/removeData',function(req,res){
  var usn = req.body.name;
  /*User.find({ username: usn }, function(err, user) {
    if (err) throw err;

    // delete him
    user.remove(function(err) {
      if (err) throw err;

      console.log('User successfully deleted!');
    });
  });*/
  User.remove({ name: usn }, function(err) {
    if (err) throw err;

    // we have deleted the user
    console.log('User deleted!');
    res.render('index', { title: 'CRUD PROGRAMMING',
      remote:data });
  });
});

/*User.find({ username: 'starlord551' }, function(err, user) {
  if (err) throw err;

  // delete him
  user.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
  });
});*/



router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRUD PROGRAMMING',
    remote:data });
});

module.exports = router;
