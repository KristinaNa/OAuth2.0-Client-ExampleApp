// var OAuthServer = require('express-oauth-server');
var express = require('express');
var session = require('express-session');
var path = require("path");
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy; 

var app = express();

app.use(session({ secret: 'tets', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
		clientID: '184238082108185',
		clientSecret: 'c7b543146c3b294b02566393fd9ad862',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log('here');
  	console.log(profile);
  	return done(null, profile);
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});


app.get('/profile', function(req, res) {
	console.log(req.user);
   // res.sendFile(path.join(__dirname+'/profile.html'));
   res.json(req.user);
});

app.get('/main', function(req, res) {
   res.sendFile(path.join(__dirname+'/main.html'));
});



app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/main'
	})
);


app.listen(3000, function() {
	console.log('YOY1O');
});