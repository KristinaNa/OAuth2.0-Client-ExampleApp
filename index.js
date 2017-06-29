// var OAuthServer = require('express-oauth-server');
var express = require('express');
var session = require('express-session');
var path = require('path');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy; 

var app = express();

var pub = __dirname;


app.use(session({ secret: 'tets', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(pub));
// app.use(express.errorHandler());

app.set('', __dirname);
app.set('view engine', 'jade');

passport.use(new FacebookStrategy({
		clientID: '184238082108185',
		clientSecret: 'c7b543146c3b294b02566393fd9ad862',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  function(accessToken, refreshToken, profile, done) {
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
	res.render('profile', { data: req.user });
});

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname+'/main.html'));
});

app.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/');
});

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/main'
	})
);


app.listen(3000, function() {
	console.log('Server is running');
});