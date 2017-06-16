const isValid = require('../services/isValid.js');
const yaml = require('yamljs');
const crypto = require('crypto');
const Crypto = require('../services/crypto.js');

const config = yaml.load('config/configDb.yml');

const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');


class RegistrationCtrl {

	get(req, res) {

		console.log('controller OOKOKKKO');
		res.render('registration.twig');

	}


	post(req, res) {



		// instance of isValid
		const IsValid = new isValid();

		//recover input registration and put in variables
		let validLastName = IsValid.validLastName(req.body.lastname);
		let validFirstName = IsValid.validFirstName(req.body.firstname);
		let validMail = IsValid.validMail(req.body.mail);
		let validPseudo = IsValid.validPseudo(req.body.pseudo);
		let validPass = IsValid.validPassword(req.body.pass);
		let validPassCompare = IsValid.validComparePassword(req.body.pass, req.body.passconfirm);
		let validAge = IsValid.validAge(req.body.age);
		let validSexe = IsValid.validSexe(req.body.sexe);

		let VALID = false;


		validMail
		.then((result) => {

			console.log('RESULT : ' + result);

			if (result) {

				console.log('on avance petit a petit');
				VALID = true;
				console.log('VALID >> ' + VALID);

				validPseudo
				.then((result) => {

					if (result) {
						console.log('on va encore dans le bon sens');
						VALID = true;
						console.log('VALID >> ' + VALID);


						if (validFirstName && validLastName) {
							VALID = true;

							if ( validPass && validPassCompare) {

								VALID = true;

								if (validAge && validSexe) {

									VALID = true;

								}else{

									VALID = false;

								}

							}else{

								VALID = false;
							}

						}else{

							VALID = false;
						}


					}else{

						console.log('mauvais coté');
						VALID = false;
						console.log('VALID >> ' + VALID);
					}

				

				})

				.catch((error) => console.log(error));

			}else{

				VALID = false;
				console.log('ici ca craint');
				console.log('VALID >> ' + VALID);
			}

		



			if (VALID) {

				console.log("VALIDDDDDDDDDDDDDDDDDD");
				console.log('EVERYTHINGGUCCI !!');

				const cryptPass = new Crypto(req.body.pass, config.default.crypt.algoCrypt, config.default.crypt.key );
				const passCrypt = cryptPass.cipher();
				console.log(passCrypt);
				


				/*const sqlmoves = new SQLmoves();

				sqlmoves.insertUser(req.body.firstname, req.body.lastname, req.body.mail, req.body.pseudo, passCrypt, req.body.age, null, "", 0, 0, req.body.sexe)

					.then(results => res.redirect('/login'));

				

				// appel a un cookie ou session

				//res.redirect('/');
				// NEW USER*/
			}else{

				console.log('UNLOGGED :/');

				res.redirect('/registration');
			}



			
			
		})

		.catch((error) => console.log(error));




				// global variable to check each input





			

		
		// all verifications for the registration form 

		// if everything is valid / true

	}
}

module.exports = RegistrationCtrl;