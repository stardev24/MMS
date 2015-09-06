// var twitter = require('ntwitter');
 
// var twit = new twitter({
//   consumer_key: 'eeBkuWJbkeiY8bJAVAcKFOK0e',
//   consumer_secret: 'jqlkBtp4nJNjdp9b00kAXLwOjMVWho6MYYnWBu6Jea3tdRCtbx',
//   access_token_key: '3398803035-HjMGSaX8bB7wicFyxo0vNTU1M9hdLRHiTEAFAUJ',
//   access_token_secret: 'jqlkBtp4nJNjdp9b00kAXLwOjMVWho6MYYnWBu6Jea3tdRCtbx'
// });
// twit
//   .verifyCredentials(function (err, data) {
//     console.log(data);
//   })
//   .updateStatus('Test tweet from ntwitter/' + twitter.VERSION,
//     function (err, data) {
//     	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//       console.log(data);
//     }
//   );

/*var TwitterClient = require('twitter-stream-client');
var twitterClient = new TwitterClient ({
        OAuth: {
            consumerKey: 'eeBkuWJbkeiY8bJAVAcKFOK0e',
            consumerSecret:  'jqlkBtp4nJNjdp9b00kAXLwOjMVWho6MYYnWBu6Jea3tdRCtbx',
        },
        keywords: '#hashtag',
        accessToken: '3398803035-HjMGSaX8bB7wicFyxo0vNTU1M9hdLRHiTEAFAUJ',
        accessTokenSecret: 'jqlkBtp4nJNjdp9b00kAXLwOjMVWho6MYYnWBu6Jea3tdRCtbx'
});
 console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",twitterClient);
twitterClient.on('newtweet', function (tweet) {
 console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",twitterClient);
    console.log(tweet.text);
});*/


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'XXXXXXX',
  consumer_secret: 'XXX',
  access_token_key: 'XXXXXXX',
  //access_token_secret: '5xsGSkHOGIvhLfsYTfoYbGzVSdgqYbei1Lek6t5a8AXi6'
  access_token_secret: 'XXXXX'
});
console.log("we are in app");
var params = {status:"BY GODS GRACE..."};
var query = {status:"hello everybody to"};
/*client.get('statuses/user_timeline', {}, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }else{
  	console.log("error is >>",error);
  }
});*/

client.post('statuses/update', params,function(error, tweet, response){
  if(error) {
  	console.log("error >>",error);

  };
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});
