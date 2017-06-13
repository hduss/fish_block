const crypto = require('../services/crypto.js');
const connection = require('mysql');

class CompareInfos {
	
	comparePassword(passwordEntry, passwordDB) {


		
	}

	compareEmail(emailEntry, emailDB) {

		connection.query(`SELECT ${emailEntry} FROM user`, (error, results, fields) => {

		});

	}

	comparePseudo(pseudoEntry, psueudoDB) {

		connection.query`SELECT ${pseudoEntry} FROM user`

	}
}




module.exports = CompareInfos;