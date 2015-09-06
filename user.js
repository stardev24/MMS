var mongoose = require('mongoose')

// create a user model

/*Modified user schema for impl
{
	"uid":String,
	"name":String,
	"email":String,
	"accountType":String, //["free","premium"]
	"access-Token":String,
	"refresh-Token":String,
	"provider:String,
	"username":String,
	"password":String,
	"streams":{type:Array,"default":[]}
}*/

/*var User = mongoose.model('User', {
	localLogin:{
		email:String,
		password:String,
		firstName:String,
		lastName:String,
		provider:String
	},
	facebook:{
		id:String,
		access_token:String,
		email:String,
		displayName:String,
		provider:String
	},
	twitter:{
		id:String,
		access_token:String,
		refresh_token:String,
		name:String,
		displayName:String
	},
	streams:{ type : Array , "default" : [] }
});
*/
var User = mongoose.model('User', {
	"uid":String,
	"name":String,
	"email":String,
	"accountType":{type:Array,"default":[]}, 
	"accessToken":String,
	"refreshToken":String,
	"provider":String,
	"username":String,
	"password":String,
	"streams":{type:Array,"default":[]},
	"profileImage":String
});


module.exports = User;