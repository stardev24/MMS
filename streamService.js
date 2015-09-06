var Twitter = require('twitter');
var userDetailsUtil = require("./utils/userDetailsUtils");
var Q = require('q');
var User = require('./user');
var makePromise = require("make-promise");
exports.addToStream = function(req,res){
  var provider = req.params.provider;
  var id = req.params.id;
  User.find({_id:id,provider:provider},function(err,user){
    if(err){
      return done(err)
    }else if(!err){
      console.log("user details are")
    }

  })
}
