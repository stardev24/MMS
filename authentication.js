var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('./user')
var _ = require('underscore');
var req = {}
passport.serializeUser(function(user, done) {
  console.log("checking serializeUser >>",user)
  if(!user[0]){
    console.log("serializeUser if conditon >>")
    done(null, user._id);
  }else{
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>else block for serializeUser",user)
    done(null, user[0]._id);    
  }
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        console.log("deserialize user >>",user[0]);
        if(!err) done(null, user);
        else done(err, null);
    })
});

module.exports = passport.use(new FacebookStrategy({
    clientID: "xxx",
    clientSecret: "xxx",
    callbackURL: "http://localhost:9999/callback",
    profileFields: ['id', 'displayName', 'link', 'about', 'emails','name']
  },
  function(accessToken, refreshToken, profile, done) {
  User.findOne({ "uid": profile.id}, function(err, user) {
    console.log("name details >>>>>",profile)
    if(err) { console.log(err); }
    else if (!err && user) { 
      done(null, user);
    } else {
      console.log("name details >>>>>",profile.name)
      var facebookUser = new User();
       var fullName = profile.name.familyName +" "+profile.name.givenName 
       facebookUser.uid = profile.id;
       facebookUser.name = fullName;
       facebookUser.email = profile.emails[0].value;
       facebookUser.accountType = "free";
       facebookUser.accessToken = accessToken;
       facebookUser.refreshToken = 'n/a';
       facebookUser.provider = profile.provider;
       facebookUser.username = "n/a";
       facebookUser.password = "n/a";
       facebookUser.profileImage = profile.profileUrl;
      facebookUser.save(function(err,user) {
        if(err) { 
          console.log(err); 
        } else {
          console.log("saving user ...");
          done(null, user);
        };
      });
    };
  });
}
));

//This is for twitter
passport.use(new TwitterStrategy({
   consumerKey: "xxx",
   consumerSecret: "xxx",
   callbackURL: "http://localhost:9999/callback1",
   profileFields: ['id', 'displayName', 'link', 'about', 'emails','name']
 },
 function(accessToken, refreshToken, profile, done) {
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("profile is >>",profile);
   console.log("OATHaccessToken is >>",accessToken);
   console.log("OATHaccessToken secret is >>",refreshToken);
 User.findOne({"uid": profile.id}, function(err, user) {
console.log("user details is >>",user);
   if(err) { console.log("error is >>",err);}
   else if (!err && user) {
     done(null, user);
   } else {

     var twitterUser = new User();
       twitterUser.uid = profile.id;
       twitterUser.name = profile.displayName;
       twitterUser.email = 'n/a'
       twitterUser.accountType = "free";
       twitterUser.accessToken = accessToken;
       twitterUser.refreshToken = refreshToken;
       twitterUser.provider = profile.provider;
       twitterUser.username = "n/a";
       twitterUser.password = "n/a";
       twitterUser.profileImage = (profile.photos[0].value || profile._json.profile_image_url)
     twitterUser.save(function(err,user) {
       if(err) { 
         console.log("error is >>",err); 
         done(err,user);
       } else {
         console.log("saving user ...",user);
         done(null, user);
       };
     });
   };
 });

}
));

//This is for local login
passport.use(new LocalStrategy(function(username, password, done) {
  console.log("username is ?>>",username);
  console.log("password is >>",password);
    User.find({username:username,password:password}, function(err, user) {
      console.log("user is >>>>",err);
      console.log("user is >>>>",user);
      if (err) {
        return done(err);
      }else if (!err){
        return done(null,user)
      }else if (!user) {
        return done(null, false);
      }
    });
}));
