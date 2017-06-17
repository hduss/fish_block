//Generic DAO 
const mysql = require('mysql');
const yaml = require('yamljs');

// yaml file for database connection
const config = yaml.load('config/configDb.yml');


class SQLmoves {

	constructor() {


		// creeta pool connection 
		this.pool = mysql.createPool({
			host     : config.default.database.host,
			user     : config.default.database.user,
			password : config.default.database.password,
			database : config.default.database.dbname

		})

	}


	// find all in table
	findAll(table) {


		return new Promise((resolve, reject) => {
			this.pool.query(`
				SELECT * 
				FROM ${table}`, 

				(error, results, fields) => {

				console.log(results);
				resolve(results);

				return results;

			})
		})

		
	}


	//find one thing 
	findOne(table, toSearch, condition) {

		return new Promise((resolve, reject) => {

			this.pool.query(

				`SELECT * 
				FROM ${table}
				WHERE ${toSearch} = ?`, [condition], 

				(error, results, fields) => {

					resolve(results);
					return results;
				})
		})


	}

	insertSerie(nameSerie, real, synopsis, nbrSaison, nbrEpisode, genderSerie, banner) {
		/*const values = 
			nameSerie: nameSerie, realisateur: real, synopsisSerie: synopsis,nbrSaison: nbrSaison, nbrEpisode: nbrEpisode, gender: genderSerie};*/

			return new Promise((resolve, reject) => {

				this.pool.query("INSERT INTO series SET ?", {nameSerie: nameSerie, realisateur: real, synopsisSerie: synopsis,nbrSaison: nbrSaison, nbrEpisode: nbrEpisode, genderSerie: genderSerie, banner: banner},

					(error, results, fields) => {

						console.log(results);
						resolve(results);
					})
			})
		}
	


	// insert user 
	// to first registration, just mail, pseudo, password and sexe are insert in database
	insertUser(firstName, lastName, mail, pseudo, password, birthday, informations, picture, isModerator, isAdmin, sexe) {

		const values = {firstName: firstName, lastName: lastName, mail: mail, pseudo: pseudo, password: password, birthday: birthday, informations: informations, picture: picture, isModerator: isModerator, isAdmin: isAdmin, sexe: sexe};

		return new Promise((resolve, reject) => {

			this.pool.query("INSERT INTO users SET ?", values,

				(error, results, fields) => {

					/*let users = new User(results.firstName, results.lastName, results.mail, results.pseudo, results. password, results.birthday, results.informations, results.picture, results.isModerator, results.isAdmin, results.sexe);*/

					console.log(results);
					//console.log(users);
					
					resolve(results);

					return results;
			})
		})

	}


	// find user by pseudo
	findUser(pseudo) {

		return new Promise((resolve, reject) => {

			this.pool.query(

				`SELECT * 
				FROM users
				WHERE pseudo = ?`, [pseudo], 

				(error, results, fields) => {

					resolve(results);
					return results;
				});
		})

		.catch((error) => {
			throw error;
		})

	
	}


	//find user by id
	findUserByID(id) {

		return new Promise((resolve, reject) => {

			this.pool.query(

				`SELECT * 
				FROM users
				WHERE user_id = ?`, [id], 

				(error, results, fields) => {

					resolve(results);
					return results;
				});
		})

		.catch((error) => {
			throw error;
		})

	}

	// find user by pseudo
	findSerie(nameSerie) {

		return new Promise((resolve, reject) => {

			this.pool.query(

				`SELECT * 
				FROM series
				WHERE nameSerie = ?`, [nameSerie], 

				(error, results, fields) => {

					resolve(results);
					return results;
				});
		})

		.catch((error) => {
			throw error;
		})

	
	}


	// update datas
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

	// delete datas
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



module.exports = SQLmoves;