const isValid = require('../services/isValid.js');
const yaml = require('yamljs');
const crypto = require('crypto');
const Crypto = require('../services/crypto.js');

const config = yaml.load('config/configDb.yml');

const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');

var bcrypt = require('bcryptjs');


class RegistrationCtrl {

	get(req, res) {


		console.log('controller OOKOKKKO');
		res.render('app/registration.html.twig');

	}

	// after submit entry
	post(req, res) {

		// instance of isValid
		const IsValid = new isValid();

		//recover input registration and put in variables
		//let validLastName = IsValid.validLastName(req.body.lastname);
		//let validFirstName = IsValid.validFirstName(req.body.firstname);
		let validMail = IsValid.validMail(req.body.mail);
		let validPseudo = IsValid.validPseudo(req.body.pseudo);
		let validPass = IsValid.validPassword(req.body.pass);
		let validPassCompare = IsValid.validComparePassword(req.body.pass, req.body.passconfirm);
		//let validAge = IsValid.validAge(req.body.age);
		let validSexe = IsValid.validSexe(req.body.sexe);

		let VALID = false;

		// start input's validation
		validPseudo
		.then((result) => {
			console.log('.then result PSEUDO >> ' + result);
			
			// if result = true, VALID change value
			if (result) {
				VALID = true;
				console.log('PSEUDO VALID >> ' , VALID);


				validMail
				.then((result) => {
					console.log('.then result MAIL >>' +  result);

					if (result) {
						VALID = true;
						console.log('MAIL VALID >> ' , VALID);

						if (validPass && validPassCompare) {

							VALID = true
							console.log('PASSWORD VALID >> ' + VALID);

							if (validSexe) {

								VALID = true;
								console.log('SEXE VALID >>>>>>> ' + VALID);
								console.log('SEXE' + validSexe);

								// all this code is if every validation are true
								if (VALID) {

									console.log("VALIDDDDDDDDDDDDDDDDDD");
									console.log('EVERYTHINGGUCCI !!');

									console.log('VALID GLOBAL >>>>>>' + VALID);

									// cipher inputPassword
									const salt = bcrypt.genSaltSync(10);
									const hash = bcrypt.hashSync(req.body.pass, salt);

									// new instance of SQLmoves to use functions
									const sqlmoves = new SQLmoves();

									// insert user in database without name, lastname, informations...
									sqlmoves.insertUser("", "", req.body.mail, req.body.pseudo, hash, "", null, "", 0, 0, req.body.sexe)

										.then(results => {
											console.log('INSERT OK');

											// if everything is OK, redirect -> /login
											res.redirect('/login');
										})
										.catch((error) => console.log(error));

								}else{

									console.log('UNLOGGED :/');
									console.log('VALID GLOBAL >>>>>>' + VALID);
									res.redirect('/registration');
								}

							}else{
								VALID = false;
								console.log('SEXE VALID >>>>>>> ' + VALID);
								console.log('VALID GLOBAL >>>>>> ' + VALID);
								res.redirect('/registration');
							}

						}else{
							VALID = false;
							console.log('PASSWORD VALID >> ' + VALID);
							console.log('VALID GLOBAL >>>>>>' + VALID);
							res.redirect('/registration');
						}

					}else{
						VALID = false;
						console.log('MAIL VALID >> ' + VALID);
						console.log('VALID GLOBAL >>>>>>' + VALID);
						res.redirect('/registration');
						
					} 
					
				})
				// catch error validMail
				.catch((error) => console.log(error));



			}else{
				VALID = false;
				console.log('PSEUDO VALID >> ' + VALID);
				console.log('VALID GLOBAL >>>>>>' + VALID);
				res.redirect('/registration');
			}

		})
		// catch error validPseudo
		.catch((error) => console.log(error));


	}
}

module.exports = RegistrationCtrl;