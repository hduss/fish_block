const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class HomeCtrl {
	
	get(req, res) {

		const sqlmoves = new SQLmoves();

		sqlmoves.findAll('series')
		.then(results => {
			res.render('app/home.html.twig', {results: results});
			console.log('RESULT ID >>>>', results.serie_id);

			resolve(results);
		})
		.catch((error) => console.log(error));




		
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
}


module.exports = HomeCtrl;