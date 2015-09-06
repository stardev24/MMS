var userDetailsUtil = require("./utils/userDetailsUtils");
var Q = require('q');
var User = require('./user');
var makePromise = require("make-promise");

/*This will provider details of user based on provider and uid*/
exports.getUserDetailsByUid = function(req,res){
  var uid = req.params.uid;
  var provider = req.params.provider;
  User.find({uid:uid,provider:provider},function(err,user){
    if(err){
    	res.status(500)
       res.send({message:"Error in getting user data >>"+err})
    }else if(!err){
    	res.status(200);
      console.log("user details are >>>",user);
      res.send({data:user[0]})
    }
  })
}