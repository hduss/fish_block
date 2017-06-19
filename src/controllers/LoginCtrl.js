// load node modules 
const compareLogin = require('../services/compareLogin.js');
const bcrypt = require('bcryptjs');
const yaml = require('yamljs');
const config = yaml.load('config/configDb.yml');


class LoginCtrl {

	constructor() {

		
	}
	
	get(req, res) {

		// render login template
		res.render('app/login.html.twig');

	}

	// after submit
	post(req, res) {

		// create new instance of compareLogin to use this functions
		const comparelogin = new compareLogin();

		//recover input data
		const pseudo = req.body.pseudo;
		let password = req.body.pass;

		// use functions of compareLogin on input datas
		let comparePseudo = comparelogin.comparePseudo(pseudo);
		let comparePass = comparelogin.comparePass(pseudo, password);


		// global variable to 
		let validLogin = false;



		// promise result
		comparePseudo
		.then( result => {
			console.log('RESULT PSEUDO >>> ', result);

			console.log("PASSWORD INPUT : ",password);

			if (result) {

				validLogin = true;
				console.log('.THEN resultPSeudo >> ' , result);

				comparePass
				.then((result, userPass) => {

					console.log('.THEN RESULT PASSWORD >> ' , result);

					
					console.log('REQ.BODY >>> ', req.body.pass);

					//const decipher =  bcrypt.compareSync(req.body.pass, result); // true 



					console.log('DECIPHER PASS >>> ', result);

					if (result) {
						console.log('COMPARE ok');
						//creer un cookie qui suis l'utilisateur
						req.session.pseudo = req.body.pseudo;
						const Pseudo = req.session.pseudo;
						console.log('SESSIOn >>>>>>>> ', req.session.pseudo);
						console.log('SESSION PSEUDO >>>>',Pseudo);
						//res.redirect('/');


						res.render('app/home.html.twig', {pseudo: Pseudo});



					}else{

						console.log('COMPARE FALSE');

						res.redirect('/login');
					}


				})

				.catch((error) => console.log(error));



			}else{

				validLogin = false;
			}
		})

		.catch((error) => console.log(error));










		/*if (comparePseudo && comparePass) {
			console.log("yessaihhhihihi");
		};*/

	}
}


module.exports = LoginCtrl;