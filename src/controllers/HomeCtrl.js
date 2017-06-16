const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class HomeCtrl {
	
	get(req, res) {
		res.render('base.html.twig');
	}

	post(req, res) {

		const searchPseudo = req.body.search;

		const sqlmoves = new SQLmoves();

		const userSearch = sqlmoves.findUser(searchPseudo)
			.then((results) => {

				const jsontrans = new JSONtrans();
				const result = jsontrans.transform(results);

				//resolve(results);
				// include user id in url to have dynamic variable and can use data in the template
				res.render(`/user/${id}`, {results: results});
			})

			.catch((error) => console.log(error));

			
	}
}


module.exports = HomeCtrl;