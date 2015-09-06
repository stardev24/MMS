var Twitter = require('twitter');
var userDetailsUtil = require("./utils/userDetailsUtils");
var Q = require('q');
var User = require('./user');
var makePromise = require("make-promise");
exports.postTweetToTwitter = function(req,res){
  var userId = req.body.userId;
  var tweetMessage = req.body.tweetMessage;
  var userDetailsTemp = []
  var promise = makePromise(function(cb) {
          User.findById(userId, function(err, userDetails){
                if(err){
                  cb(err);
                }else{
                  cb(userDetails) 
                }
          })      
    });
    promise.then(function(data){
      userDetailsTemp.push(data.twitter)
    },function(err){
      console.log("err after promise >>",err)
        var client = new Twitter({
          consumer_key: '1lUBWsOuDQIE4MQVSzwibfjFh',
          consumer_secret: 'xdOqXRCVpFEl87nOHZyimDVncCgFkvYwpcAuFZ8rAVI0xupKLZ',
          access_token_key: err.twitter.access_token,
          access_token_secret:err.twitter.refresh_token
        });
          console.log("client >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",client)
        var params = {status:tweetMessage};
        client.post('statuses/update', params,function(error, tweet, response){
          if(error) {
            console.log("error >>",error);
          };
          console.log(tweet);  // Tweet body. 
          console.log(response);  // Raw response object. 
        });
        res.status(201);
        res.send("post for twitter is successfully done");
        res.end();
    })

/*      var client = new Twitter({
        consumer_key: 'eeBkuWJbkeiY8bJAVAcKFOK0e',
        consumer_secret: 'jqlkBtp4nJNjdp9b00kAXLwOjMVWho6MYYnWBu6Jea3tdRCtbx',
        //access_token_key: '3398524120-l7KQoHgM0z9X0NRVCCINEXKUKDAWvyNC3xjPsvy',
        //access_token_secret: '5xsGSkHOGIvhLfsYTfoYbGzVSdgqYbei1Lek6t5a8AXi6'
        //access_token_secret: '4ko6RIieH5dX3DOt9JB7vEA16Qm4n3N3jQcyKKkSAuvF6'
        access_token_key: access_token_key,
        access_token_secret:access_token_secret
      });*/

}

