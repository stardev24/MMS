// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var cors = require('cors')
var User = require('./user.js');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./authentication.js');
var localLoginAndSignUp = require('./localLoginAndSignUp');
var postTweet = require("./postTweet");
var streamService = require("./streamService")
var userDetailsService = require('./userDetailsService')

// connect to the database
mongoose.connect('mongodb://localhost/fbTwitter');

var app = express();
var request = require('request');

//CORS implementation

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(cors());
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'my_test' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('express-promise')());
  app.use(express.static(__dirname + '/public'));

});

/*Routes*/ 
//This is for local registration and login
app.post('/register',localLoginAndSignUp.register);
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log("user exists in local>>>>>>>>>>>>",req.user)
    res.redirect('http://localhost/TestFolder/account.html?uid='+req.user.uid+'&provider='+req.user.provider);
  });

//This is for facebook login
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  });
app.get('/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    console.log("user exists in facebook>>>>>>>>>>>>",req.user)
    res.redirect('http://localhost/TestFolder/account.html?uid='+req.user.uid+'&provider='+req.user.provider);
  });

//This is for twitter login
app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
  });
app.get('/callback1', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    console.log("user exists in twitter>>>>>>>>>>>>",req.user)
    res.redirect('http://localhost/TestFolder/account.html?uid='+req.user.uid+'&provider='+req.user.provider);
  });

//This is for logout 
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//Endpoints for app
app.get('/user/provider/:provider/details/:uid',userDetailsService.getUserDetailsByUid)
app.post('/twitter/post/status',postTweet.postTweetToTwitter);
app.put('account/provider/:provider/uid/:id',streamService.addToStream)



// port config
app.listen(9999,'localhost');
console.log(" Node server running at 9999")



module.exports = app
