
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require("mongoose");

var Account = require("./models/account");

//var flash = require('connect-flash');

/*passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log(username + ':' + password);
		return done(null, {id: 123, username: "yomama"});
	}
));*/

/*passport.use(new LocalStrategy(
	Account.authenticate()
));*/

passport.use(Account.createStrategy());

passport.serializeUser(
/*function(user, done) {
	done(null, user.id);
}*/
	Account.serializeUser()
);

passport.deserializeUser(
	/*function(id, done) {
		done(null, {id: 123, username: "yomama"});
	}*/
	Account.deserializeUser()
);

mongoose.connect("mongodb://localhost/theapp_db");

/*Account.register(new Account({ username: "jon tor"}), "yomama", function(err, account) {
	console.dir(account);
});*/

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
// tork
app.use(express.errorHandler());
// tork
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
}

app.post('/login', passport.authenticate('local'), 
	function(req, res) {
		//console.dir(req.user);
		//res.redirect('/users/' + req.user.username);
		console.log("passport.authenticate success");
		console.log("IsAuthenticated=" + req.isAuthenticated());
		res.send(req.user);
	}
);

//app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
