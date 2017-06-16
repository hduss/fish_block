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
		let password = req.body.pass;

		let comparePseudo = comparelogin.comparePseudo(pseudo);
		let comparePass = comparelogin.comparePass(pseudo);



		let validLogin = false;




		comparePseudo
		.then( result => {
			console.log('RESULT PSEUDO >>> ', result);

			console.log("PASSWORD INPUT : ",password);

			if (result) {

				validLogin = true;
				console.log('.THEN resultPSeudo >> ' , result);

				comparePass
				.then((result, userPassword) => {

					console.log('.THEN RESULT PASSWORD >> ' , result);

					
					console.log('REQ.BODY >>> ', req.body.pass);

					const decipher =  bcrypt.compareSync(password, result); // true 



					console.log('DECIPHER PASS >>> ', decipher);

					if (decipher) {
						console.log('COMPARE ok');

						//creer un cookie qui suis l'utilisateur
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