
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js')

class UserCtrl {
	
	get(req, res) {

		const sqlmoves = new SQLmoves();

		const user = sqlmoves.findAll('users')
			.then(results => res.render('users.twig', {
				
				results: results
			}));
	}

}

module.exports = UserCtrl;