const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class HomeCtrl {
	
	get(req, res) {
		res.render('layout.twig');
	}

	post(req, res) {

		const searchPseudo = req.body.search;

		const sqlmoves = new SQLmoves();

		const userSearch = sqlmoves.findUser(searchPseudo)
			.then((results) => {

				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);

				//resolve(results);
				res.render(`/user/${id}`, {results: results});
			});

			
	}
}


module.exports = HomeCtrl;