const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class HomeCtrl {
	
	get(req, res) {
		res.render('app/home.html.twig');
	}

	post(req, res) {

		const search = req.body.search;

		const sqlmoves = new SQLmoves();

		const userSearch = sqlmoves.findSerie(search)
			.then((results) => {

				console.log(results);

				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);

				console.log(result.nameSerie);
				console.log(result.serie_id);
				console.log(result);

				const id = result.serie_id;


				//resolve(results);
				// include user id in url to have dynamic variable and can use data in the template
				res.redirect(`/series/${id}`);
			})

			.catch((error) => console.log(error));

			
	}
}


module.exports = HomeCtrl;