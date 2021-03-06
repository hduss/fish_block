const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const crypto = require('crypto');
const Crypto = require('../services/crypto.js');
const yaml = require('yamljs');
const config = yaml.load('config/configDb.yml');
const JSONtrans = require('../services/JSONtrans.js');
const bcrypt = require('bcryptjs');


class compareLogin{

	constructor(){

		this.sqlmoves = new SQLmoves();

	}

	comparePseudo(pseudo) {

		return new Promise((resolve, reject) => {

			// find user by pseudo
			this.sqlmoves.findUser(pseudo)

				.then(results => {

					// new instance JSONtrans()
					const jsontrans = new JSONtrans();
					// change results in JSON format with .transform from JSONtrans()
					let result = jsontrans.transform(results);

					console.log('result >>>> ',  result);

					//console.log(result);
					//console.log(result.firstName);

					// if there is a result
					if (result) {


						console.log('LE pseudo correspond a un pseudo valid >> ', result.pseudo);
						result = true;
		
					// if there is no result / impossible login
					}else{

						console.log("le login ne correspond a aucun compte");
						result = false;
					}


					//resolve(result);
					resolve(result);
				})

				.catch((error) => console.log(error));
			//.then(results => return results);
		})

	}





	comparePass(userPseudo, inputPassword) {
		return new Promise((resolve, reject) => {

			// find user by pseudo in database
			this.sqlmoves.findUser(userPseudo)

				.then((results) => {

					// transform results in JSON
					const jsontrans = new JSONtrans();

					let result = jsontrans.transform(results);


					console.log("RESULT PASS >>> ", result);

					let pass = result.password;

					// if user exist in databse
					if (pass) {

						console.log('PASSWORD >>>>> ', pass);

						//recover his password to use it in the LoginCtrl

						const decipher =  bcrypt.compareSync(inputPassword, pass); // true 

						console.log('DECRYPT >>>> ', decipher);

						
						
					// else -> new try
					}else{

						console.log('le pseudo ne correspond a aucun compte');
						res.redirect('/login');
					}


					resolve(result);


				})

				.catch((error) => console.log(error));
		})

	}
}


module.exports = compareLogin;