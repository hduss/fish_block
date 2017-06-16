const compareLogin = require('../services/compareLogin.js');
const bcrypt = require('bcryptjs');
const yaml = require('yamljs');
const config = yaml.load('config/configDb.yml');

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
		let password = req.body.password;


		let comparePseudo = comparelogin.comparePseudo(pseudo);
		let comparePass = comparelogin.comparePass(pseudo, password);

		let validLogin = false;




		comparePseudo
		.then( result => {
			console.log('RESULT PSEUDO >>> ', result);

			if (result) {

				validLogin = true;
				console.log('.THEN resultPSeudo >> ' , result);

				comparePass
				.then(result => {

					console.log('RESULT PASSWORD >> ' , result);

					//const decipher =  bcrypt.compareSync(password, result); // true 



					console.log('DECIPHER PASS >>> ', decipher);

					if (result) {
						console.log('COMPARE ok');
						res.redirect('/');



					}else{

						console.log('COMPARE FALSE');

						res.redirect('/login');
					}


				})

				.catch((error) => console.log(error));



			}else{

				validLogin = false;
			}
		})

		.catch((error) => console.log(error));










		/*if (comparePseudo && comparePass) {
			console.log("yessaihhhihihi");
		};*/

	}
}


module.exports = LoginCtrl;