const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const crypto = require('crypto');
const Crypto = require('../services/crypto.js');
const yaml = require('yamljs');
const config = yaml.load('config/configDb.yml');


class compareLogin{

	constructor(){

		this.sqlmoves = new SQLmoves();

	}

	comparePseudo(pseudo) {

		this.sqlmoves.findOne('users', 'pseudo', pseudo ).then(results => console.log(results));
		//.then(results => return results);


	}

	comparePass(user) {

		const result = this.sqlmoves.findOne('users', 'pseudo', user)
			.then( (results) => {
				console.log(JSON.stringify(results));


				


			});

	}
}


module.exports = compareLogin;