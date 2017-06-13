

class isValid {

	validMail(userMail) {

		// regex for mail
		const re = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\.+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

	
		// compare userMail with regex
		const compareMail = userMail.match(re);

		if (compareMail) {

			console.log('COMPARED OK !!! ');
			return true;

		}else{

			console.log('COMPARED FAILED !!! ');
			return false;
		}

		// verifier si le mail est deja present dans la base de données 


	}


	validPseudo(userPseudo) {

		if (userPseudo && userPseudo.length > 6) {

			console.log('PSEUDO VALID !');
			return true;

		}else{

			return false;
		};


		// verifier si le pseudo est deja existant
	}


	validPassword(userPassword) {

		this.userPassword = userPassword;
		
    	//at least 8 characters, at least 1 numeric character, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 special character

		const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);

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

		if (age >= 18) {
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


