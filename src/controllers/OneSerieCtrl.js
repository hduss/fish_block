const mysql = require('mysql');
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const userdto = require('../classDTO/userDTO.js');
const yaml = require('yamljs');

// yaml file for database connection
const config = yaml.load('config/configDb.yml');

const JSONtrans = require('../services/JSONtrans.js');



class OneSerieCtrl {

	/*constructor(connection) {

	}*/
	

	get(req, res) {

		const serie_id = req.params.numserie;

		const sqlmoves = new SQLmoves();

				

		sqlmoves.findOne('series', 'serie_id', serie_id)
			.then(results => {
				console.log(results);


				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);


				res.render('oneSerie.twig', {result: result});
			}
		);

	}



		/*const serieID = req.params.numserie;
		console.log(serieId);

		const sqlmoves = new SQLmoves();

		sqlmoves.findOne()
		*/


}


module.exports = OneSerieCtrl;