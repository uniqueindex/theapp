
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/


var passport = require('passport');
var Account = require("../models/account");

module.exports = function(app) {
	app.post('/login', passport.authenticate('local'), 
		function(req, res) {
			//console.dir(req.user);
			//res.redirect('/users/' + req.user.username);
			console.log("passport.authenticate success");
			console.log("IsAuthenticated=" + req.isAuthenticated());
			res.send(req.user);
		}
	);

	app.post('/register', function(req, res) {
		Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
				if (err) {
					console.log("Failed to register user: " + err);
					res.send(401);
					return;
				}

				console.log("Successfully registered user: " + account.username);
				res.send(account);
			}
		);
		
	});
}