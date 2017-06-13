//Generic DAO 
const mysql = require('mysql');
const user = require('../classDTO/userDTO.js');
const yaml = require('yamljs');

// yaml file for database connection
const config = yaml.load('config/configDb.yml');

class SQLmoves {

	constructor() {

		this.pool = mysql.createPool({
			host     : config.default.database.host,
			user     : config.default.database.user,
			password : config.default.database.password,
			database : config.default.database.dbname

		})

	}


	// En param, il faut passer le nom de la classe provenant du require('****')
	/*constructor(className) {
		this._className = className;
	}*/

	

	findAll(table) {


		return new Promise((resolve, reject) => {
			this.pool.query(`
				SELECT * 
				FROM ${table}`, 

				(error, results, fields) => {

				console.log(results);
				resolve(results);

			//const allResults = results;

				return results;

			})
		})

		
	}



	findOne(table, toSearch, condition) {

		return new Promise((resolve, reject) => {

			this.pool.query(

				`SELECT * 
				FROM ${table}
				WHERE ${toSearch} = ?`, [condition], 

				(error, results, fields) => {

					resolve(results);
					console.log(results);
					return results;
				})
		})


	}



	findDecipher() {

	}

	insertUser(firstName, lastName, mail, pseudo, password, birthday, informations, picture, isModerator, isAdmin, sexe) {

		const values = {firstName: firstName, lastName: lastName, mail: mail, pseudo: pseudo, password: password, birthday: birthday, informations: informations, picture: picture, isModerator: isModerator, isAdmin: isAdmin, sexe: sexe};

		return new Promise((resolve, reject) => {

			this.pool.query("INSERT INTO users SET ?", values,

				(error, results, fields) => {

					console.log(results);
					console.log(error);
					console.log(fields);

					
					resolve(results);

					return results;
			})
		})


	}



	/*insertCipher(table, condition, toInsert) {

		const cryptPass = new Crypto(toInsert, config.default.crypt.algoCrypt, config.default.crypt.key );


		const ciphed = cryptPass.cipher();

		return new Promise((resolve, reject) => {

			this.pool.query(`
				INSERT INTO ${table} 
				SET ${condition} = ? `, [ciphed], 

				(eror, results, fields) => {

					console.log(results);
					resolve(results);

					return results;


			})
			
		})


	}*/


	updateOne(table, condition1, condition2, egal1, egal2 ) {

		return new Promise((resolve, reject) => {

			this.pool.query(`
				UPDATE ${table} 
				SET ${condition1} = ? 
				WHERE ${condition2} = ?`, 
				[egal1, egal2], 

				(error, results, fields) => {

					if (error) throw error;

					console.log(`UPDATED table ${table}`);
					resolve(results);
					return results;
				})
			})

	}


	delete(table, condition, toDelete) {

		return new Promise((resolve, reject) => {

			this.pool.query(`
				DELETE FROM ${table} 
				WHERE ${condition} = ?`,[toDelete], 

				(error, results, fields) => {

				if (error) throw error;
				resolve(results);
				console.log('deleted ' + toDelete);
				return results;
			})
		})



	}

	addAdmin() {

	}

	addModerator() {


	}


}

// const sqlMoves = new SQLmoves(userDTO);

// sqlMoves.findAll().then(
	// results => console.log(results);
//	results => {
//		results.forEach(result => console.log(result.firstName))
//	}
//)

module.exports = SQLmoves;