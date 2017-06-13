class HomeCtrl {
	
	get(req, res) {
		res.render('layout.twig');
	}
}


module.exports = HomeCtrl;