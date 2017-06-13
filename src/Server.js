const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// controllers
const RegistrationCtrl = require('./controllers/RegistrationCtrl.js');



class Server {

	constructor() {

		this.app = express();
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
    		extended: true
		}));

	}



	run() {

		const port = process.env.PORT || 3000 /*config.default.server.port*/; 
 
		this.app.listen(port, () => { console.log("connected ! ")});

	}


	initRoutes() {

		RegistrationCtrl = new registrationCtrl();
		/*LoginCtrl = new loginCtrl();
		SerieCtrl = new SerieCtrl();*/


		this.app.get('/registration', registrationCtrl.get());



	}

}


module.exports = Server;