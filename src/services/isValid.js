const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class isValid {

	validMail(userMail) {


		return new Promise((resolve, reject) => {

		// regex for mail
			const re = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\.+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);
		
			// compare userMail with regex
			let compareMail = userMail.match(re);
			const sqlmoves = new SQLmoves();


			// if mail format is valid 
			if (compareMail) { 


				sqlmoves.findOne('users', 'mail', compareMail)
					.then(results => {

						// instance of JSONtrans() -> /services
						const jsontrans = new JSONtrans();
						// on transforme l'object en JSON
						let result = jsontrans.transform(results);


						if (!result) {

							console.log('l\'adresse mail n\'existe pas en BDD');

							result = true;

							console.log("result.mail : " + result.mail);

						}else{

							result = false;
							console.log('l\'adresse mail existe DEJA en BDD');
									
		
						}

						//result egale a l'objet users de la BDD
						// undefined if not in database 
						console.log('result after if else : ' + result);
						//console.log('result.mail' + result.mail);

						console.log('compareMail : ' + compareMail);
						console.log('userMail : ' + userMail);

						resolve(result);

			
					})

					.catch((error) => {console.log(error)});


			// if mail format is not valid
			}else{
				console.log('l\'adresse mail n\'est pas valide');

			};



		})


	}


	validPseudo(userPseudo) {

		return new Promise((resolve, reject) => {


			const sqlmoves = new SQLmoves();

			sqlmoves.findUser(userPseudo)

				.then( results => {

					const jsontrans = new JSONtrans();

					// send just first result because there is just one account per person
					let result = jsontrans.transform(results);

					if (!result) {

						result = true;
						console.log('Le pseudo n\'existe pas en BDD');

					}else{

						result = false;
						console.log('le pseudo existe en base de donnée');

					}

					console.log('result of pseudo >> ' + result)

					resolve(result);
			
				})

				.catch((error) => console.log(error));

		})


	}


	validPassword(userPassword) {

		
    	//at least 8 characters, at least 1 numeric character, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 special character

    	//recover good regex
		const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);

		//verify if userPassword  
		const verif = regexPass.test(userPassword);

		console.log(verif);

		if (verif) {

			return true;
		}else{

			return false;
		}


	}


	validComparePassword(userPassword, verifPassword) {

		if ((userPassword && verifPassword) && userPassword === verifPassword) {

			return true;
		}else{

			return false;
		}
	}


	validFirstName(firstName) {

		if (firstName && typeof firstName === "string") {


			return true;
		}else{


			return false;
		};
	}

	validLastName(lastName) {

		if (lastName && typeof lastName === "string") {
			

			return true;
		}else{

			return false;
		};
	}

	validAge(age) {

		if (age && age >= 18) {

			return true;
			
		}else{

			return false;
		};
	}

	validSexe(sexe) {

		if (sexe) {
			return true;
		}else{
			return false;
		}
	}
}


module.exports = isValid;


