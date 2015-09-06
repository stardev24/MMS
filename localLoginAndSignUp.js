var express = require('express');
var app = express();
var User = require('./user');
var uid = require('uid')
exports.register=function(req,res){
	console.log("coming >>>>>>>>>>>>>>",req.body)
	 var firstName = req.body.firstName;
	 var lastName  = req.body.lastName;
	 var email = req.body.email;
	 var password  = req.body.password;
console.log("data is coming >>>>",email,password)
	User.findOne({'email':email},function(err,user){
		if(err){
			res.status(500)
			res.send({message:"Error in finding user details>>"+err})
		}else if(user){
			res.status(400)
			res.send({message:"User already exist in database..Try it with new one"})
		}else{
			var newUser = new User();
			var userId  = uid(10);
			console.log("uid generated with >>>>",userId)
			var displayName = firstName + " "+lastName
		       newUser.uid = userId;
		       newUser.name = displayName;
		       newUser.email = email;
		       newUser.accountType = "free";
		       newUser.accessToken = 'n/a';
		       newUser.refreshToken = 'n/a';
		       newUser.provider = 'local';
		       newUser.username = email;
		       newUser.password = password;
		       newUser.profileImage = 'n/a'
			newUser.save(function(err,accountDetails){
				if(!err){
					console.log("data status>>>",accountDetails);
					res.status(200);
					res.send({message:"user details saved into our database"});
				}else{
					res.send({message:"problem in storing into databse >>"+err});
				}
			})
		}
	})

};
exports.login = function(req,res){

}
