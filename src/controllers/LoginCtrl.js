const compareLogin = require('../services/compareLogin.js');

class LoginCtrl {

	constructor() {

		
	}
	
	get(req, res) {

		console.log('login get');
		res.render('login.twig');

	}


	post(req, res) {

		const comparelogin = new compareLogin();

		const pseudo = req.body.pseudo;
		const pass = req.body.pass;

		//const comparePseudo = comparelogin.comparePseudo(pseudo)
		const comparePass = comparelogin.comparePseudo(pseudo);

		/*if (comparePseudo && comparePass) {
			console.log("yessaihhhihihi");
		};*/


		res.redirect('/');
	}
}


module.exports = LoginCtrl;