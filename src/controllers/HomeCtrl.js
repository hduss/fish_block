const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');

class HomeCtrl {
	
	get(req, res) {
		res.render('layout.twig');
	}

	post(req, res) {

		const searchPseudo = req.body.search;

		const sqlmoves = new SQLmoves();

		const userSearch = sqlmoves.findUser(searchPseudo)
			.then((results) => {

				let string = JSON.stringify(results);

				const json = JSON.parse(string);

				const id = json[0].user_id;

				console.log(id);

				//resolve(results);
				res.render(`/user/${id}`, {results: results});
			});

			
	}
}


module.exports = HomeCtrl;