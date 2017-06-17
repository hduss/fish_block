const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');
const JSONtrans = require('../services/JSONtrans.js');

class MenuCtrl {
	
	post(req, res) {

		const search = req.body.search;

		const sqlmoves = new SQLmoves();
		const jsontrans = new JSONtrans();
		console.log(search);

		sqlmoves.findSerie(search)
		.then(results => {
			console.log(results)
		})

		.catch((error) => console.log(error));


	}
}

module.exports = MenuCtrl;