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
		res.render('registration.twig');

	}


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



								if (VALID) {

									console.log("VALIDDDDDDDDDDDDDDDDDD");
									console.log('EVERYTHINGGUCCI !!');

									console.log('VALID GLOBAL >>>>>>' + VALID);

									// cipher user password in database if all conditions === true
									const salt = bcrypt.genSaltSync(10);
									const hash = bcrypt.hashSync(req.body.pass, salt);

									console.log('HASH >>> ', hash);

					
									


									const sqlmoves = new SQLmoves();







									sqlmoves.insertUser("", "", req.body.mail, req.body.pseudo, hash, "", null, "", 0, 0, req.body.sexe)

										.then(results => {
											console.log('INSERT OK');
											res.redirect('/login');
										})
										.catch((error) => console.log(error));

									
									// appel a un cookie ou session

									//res.redirect('/');
									// NEW USER
								}else{

									console.log('UNLOGGED :/');
									console.log('VALID GLOBAL >>>>>>' + VALID);

									//res.redirect('/registration');
								}

							}else{
								VALID = false;
								console.log('SEXE VALID >>>>>>> ' + VALID);
								console.log('VALID GLOBAL >>>>>> ' + VALID);
							}




						}else{
							VALID = false;
							console.log('PASSWORD VALID >> ' + VALID);
							console.log('VALID GLOBAL >>>>>>' + VALID);
						}



					}else{
						VALID = false;
						console.log('MAIL VALID >> ' + VALID);
						console.log('VALID GLOBAL >>>>>>' + VALID);
						
					} 
					
				})
				.catch((error) => console.log(error));


			}else{
				VALID = false;
				console.log('PSEUDO VALID >> ' + VALID);
				console.log('VALID GLOBAL >>>>>>' + VALID);
			}

			

			
		})
		.catch((error) => console.log(error));


	
		// all verifications for the registration form 

		// if everything is valid / true

	}
}

module.exports = RegistrationCtrl;