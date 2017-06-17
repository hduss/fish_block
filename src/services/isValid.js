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

				console.log('mail valid ' + compareMail);

				// search in database if email already exist
				sqlmoves.findOne('users', 'mail', compareMail)

				.then(results => {


					const jsontrans = new JSONtrans();

					let result = jsontrans.transform(results);

					console.log('result of database MAIL >> ', result);
					

					// if result exist -> mail unexepted 
					if (result) {
						console.log('MAIL already exist in database');
						result = false;

					// else mail is accepted
					}else{
						console.log('MAIL is valid >>' + compareMail);
						result = true;
					}

					// resolve result to use it in registratioCtrl in validMail.then
					resolve(result);

				})

				.catch((error) => {console.log(error)});
				
			}else{

				console.log('mail invalid >>' + userMail)
			}


		});

	}


	validPseudo(userPseudo) {

		return new Promise((resolve, reject) => {

			const sqlmoves = new SQLmoves();


			if (userPseudo.length >= 4 ) {
				console.log('PSEUDO Valid >> ' + userPseudo);

				//same thing for pseudo, to keep unique pseudo
				sqlmoves.findUser(userPseudo)
				.then(results => {

					const jsontrans = new JSONtrans();
					let result = jsontrans.transform(results);

					console.log('result PSEUDO >> ', result);

					if (result) {
						console.log('PSEUDO already exist in database ', result);
						result = false;
					}else{
						console.log('PSEUDO valid ' + userPseudo);
						result = true;
					}

					resolve(result);
				})

				.catch((error) => console.log(error));

			}else{
				console.log('PSEUDO inValid >> ' + userPseudo);
			}

		});


	}


	validPassword(userPassword) {

		
    	//at least 8 characters, at least 1 numeric character, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 special character

    	//recover good regex
		const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);

		//verify if format userPassword is valid with the regex 
		const verif = regexPass.test(userPassword);

		console.log(verif);

		if (verif) {

			return true;
		}else{

			return false;
		}


	}


	// verif if twice password in registartion input are the same
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


