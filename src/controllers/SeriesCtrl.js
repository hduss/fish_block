const mysql = require('mysql');
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');



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
				res.render('app/series.html.twig', {results: results});
				console.log(results);
			}
		);

	}

	post(req, res) {

		const search = req.body.search;

		const sqlmoves = new SQLmoves();

		const userSearch = sqlmoves.findSerie(search)
			.then((results) => {

				console.log(results);

				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);

				if (result) {


					console.log(result.nameSerie);
					console.log(result.serie_id);
					console.log(result);

					const id = result.serie_id;

					res.redirect(`/series/${id}`);

				}else{
					res.redirect('/');
				}
			})
			
					
			

			.catch((error) => console.log(error));
	}



		/*const serieID = req.params.numserie;
		console.log(serieId);

		const sqlmoves = new SQLmoves();

		sqlmoves.findOne()
		*/


}


module.exports = SeriesCtrl;