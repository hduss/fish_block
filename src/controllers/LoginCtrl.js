const isValid = require('../services/isValid.js')

class LoginCtrl {
	
	get(req, res) {

		console.log('login get');
		res.render('login.twig');

	}


	post(req, res) {


		const IsValid = new isValid();

		IsValid.validMail(req.body.mail);

		req.session.mail = req.body.mail;
		const LOGIN = req.body.pass;
		console.log(req.session.mail);
		console.log(LOGIN);


		console.log('login post');
		res.redirect('/login');
	}
}


module.exports = LoginCtrl;