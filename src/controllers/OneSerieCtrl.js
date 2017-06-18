const mysql = require('mysql');
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
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


				res.render('app/oneSerie.html.twig', {result: result});
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


module.exports = OneSerieCtrl;