
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class UserWallCtrl {
	
	get(req, res) {


		const id = req.params.user_id;

		console.log(id);

		const sqlmoves = new SQLmoves();

		const user = sqlmoves.findUserByID(id)

			.then(results => {

				const jsontrans = new JSONtrans();

				const result = jsontrans.transform(results);


				console.log(id);
				res.render('app/userWall.html.twig', {
					result: result
				});

		});

	}
}

module.exports = UserWallCtrl;