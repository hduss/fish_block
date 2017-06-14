const mysql = require('mysql');
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');


const yaml = require('yamljs');

// yaml file for database connection
const config = yaml.load('config/configDb.yml');



class SeriesCtrl {

	/*constructor(connection) {

	}*/
	

	get(req, res) {

		const sqlmoves = new SQLmoves();


		sqlmoves.findAll('series').then(
			results => {
				res.render('series.twig', {results: results});
				console.log(results);
			}
		);

	}



		/*const serieID = req.params.numserie;
		console.log(serieId);

		const sqlmoves = new SQLmoves();

		sqlmoves.findOne()
		*/


}


module.exports = SeriesCtrl;