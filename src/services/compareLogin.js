const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const crypto = require('crypto');
const Crypto = require('../services/crypto.js');
const yaml = require('yamljs');
const config = yaml.load('config/configDb.yml');
const JSONtrans = require('../services/JSONtrans.js');


class compareLogin{

	constructor(){

		this.sqlmoves = new SQLmoves();

	}

	comparePseudo(pseudo) {

		this.sqlmoves.findOne('users', 'pseudo', pseudo)

			.then(results => {

				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);



				//console.log(result);
				//console.log(result.firstName);

				if (result.pseudo === pseudo) {

					console.log('RESUUUULT');
					return result[0];

				}else{

					console.log("NOOOOOOOOOOOOOOOOOOOOOOT");
					return false;
				}
			});
		//.then(results => return results);


	}

	comparePass(user) {

		const result = this.sqlmoves.findOne('users', 'pseudo', user)
			.then( (results) => {
				console.log(JSON.stringify(results));
				// voir HomeCtrl pour json recup result[];


			});
	}
}


module.exports = compareLogin;