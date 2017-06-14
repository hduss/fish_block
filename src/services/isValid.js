const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class isValid {

	validMail(userMail) {

		// regex for mail
		const re = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\.+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

	
		// compare userMail with regex
		const compareMail = userMail.match(re);


		const sqlmoves = new SQLmoves();
		const mailDB = sqlmoves.findOne('users', 'mail', userMail)
			.then( results => {
				console.log(userMail, "MAIL ALREADY EXIST")

				if (compareMail === userMail) {

					console.log('MAIL INVALID !!! ');
					return false;

				}else if(!compareMail) {

					console.log('MAIL INVALID !!! ');
					return false;
				}
			});


		// verifier si le mail est deja present dans la base de données 


	}


	validPseudo(userPseudo) {

		const sqlmoves = new SQLmoves();

		const pseudoDB = sqlmoves.findUser(userPseudo)
			.then( results => {
				//console.log(results);

				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);

				console.log(JSON.stringify(result));
				console.log("result", result.pseudo)

				
				// if pseudo already exist in database
				if (userPseudo === result.pseudo) {
					console.log("PSEUDO INVALID, ALREADY EXIST");
					return false;

				// else if input pseudo is empty or less than 4 caracter
				}else if(!userPseudo || userPseudo.length < 4 ) {
					console.log("PSEUDO INVALID, less than 4 caractere or EMPTY")
					return false;

				// else everything is ok
				}else{
					console.log("PSEUDO VALID ");
					return true;
				}
				
			

			


			/*if (userPseudo === result) {
					//console.log("ALREADY EXIST");
				//};

				/*if (result === "undefined") {
					console.log('PSEUDO INVALID, ALREADY EXIST');
					return false;

				}else if(userPSeudo && userPseudo > 4) {
					console.log('PSEUDO VALIIIID');

					return true;
				}else {
					console.log('PSEUDO INVALIIIIIID');
				}*/



			});



	}


	validPassword(userPassword) {

		this.userPassword = userPassword;
		
    	//at least 8 characters, at least 1 numeric character, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 special character

    	//recover good regex
		const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);

		//verify if userPassword  
		const verif = regexPass.test(this.userPassword);

		console.log(verif);

		if (verif) {

			console.log('PASSWORD VALID !!! ');

			return true;
		}else{

			console.log('PASSWORD INVALID');

			return false;
		}


	}


	validComparePassword(userPassword, verifPassword) {

		if ((userPassword && verifPassword) && userPassword === verifPassword) {

			console.log('VERIF PASSWORD OK !!!');
			return true;
		};
	}


	validFirstName(firstName) {

		if (firstName && typeof firstName === "string") {

			console.log("FIRSTNAME VALID !!");
			return true;
		}else{

			console.log('FIRSTNAME INVALID');
			return false;
		};
	}

	validLastName(lastName) {

		if (lastName && typeof lastName === "string") {
			
			console.log("LASTNAME VALID !!");
			return true;
		}else{

			console.log('LASTNAME INVALID');
			return false;
		};
	}

	validAge(age) {

		if (age && age >= 18) {
			console.log('AGE VALID');
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


