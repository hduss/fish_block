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

		let VALID = false;

		// instance of isValid
		const IsValid = new isValid();

		let validLastName = IsValid.validLastName(req.body.lastname);
		let validFirstName = IsValid.validFirstName(req.body.firstname);
		let validMail = IsValid.validMail(req.body.mail);
		let validPseudo = IsValid.validPseudo(req.body.pseudo);
		let validPass = IsValid.validPassword(req.body.pass);
		let validPassCompare = IsValid.validComparePassword(req.body.pass, req.body.passconfirm);
		let validAge = IsValid.validAge(req.body.age);
		let validSexe = IsValid.validSexe(req.body.sexe);




		// all verifications for the registration form 
		if (validFirstName && validLastName & validMail) {
			VALID = true;

			if (validPseudo) {
				VALID = true;

				if ( validPass && validPassCompare) {


					VALID = true;

					if (validAge && validSexe) {

						console.log(validSexe.value);
//--------------------------change in DTO DAO--------------------

						VALID = true;


//--------------------------change in DTO DAO--------------------

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

			VALID = false;
		}

		// if everything is valid / true
		if (VALID) {
			console.log('EVERYTHINGGUCCI !!');

			let cryptPass = new Crypto(req.body.pass, config.default.crypt.algoCrypt, config.default.crypt.key );
			let cryptMail = new Crypto(req.body.mail, config.default.crypt.algoCrypt, config.default.crypt.key);

			cryptPass += cryptPass.cipher();
			cryptMail += cryptMail.cipher();

			console.log(cryptPass);
			console.log(cryptMail);


			const sqlmoves = new SQLmoves();

			sqlmoves.insertUser(req.body.firstname, req.body.lastname, cryptMail, req.body.pseudo, cryptPass, req.body.age, null, "", 0, 0, req.body.sexe).then(results => res.redirect('/'));

			

			// appel a un cookie ou session

			//res.redirect('/');
			// NEW USER
		}else{

			console.log('UNLOGGED :/');

			res.redirect('/registration');
		}

	}
}

module.exports = RegistrationCtrl;