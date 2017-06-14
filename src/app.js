
const express = require('express');
const mysql = require('mysql');

// yamljs, parse, stringify and load functions
const twig = require ('twig');

// to read input forms
const yaml = require('yamljs');

// yaml file for database connection
const config = yaml.load('config/configDb.yml');
 	

const bodyParser = require('body-parser');
const session = require('express-session');



// create the connection with parameters from configDb.yml
const connection = mysql.createConnection({
	host     : config.default.database.host,
	user     : config.default.database.user,
	password : config.default.database.password,
	database : config.default.database.dbname
});




// CONNECT DB FIRST
connection.connect((err) => {

 	if (err) {
   		console.error('error connecting: ' + err.stack);
   		return;
 	}

 	console.log('Database ' + config.default.database.dbname + ' Connected !');

 	// INIT SERVER AFTER DB
 	const app = express();

 	// MIDDLEWARES

 	// bodyParser to use input submit
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ 
		extended: true 
	}));

 	app.use(session({

		secret:'secret',
		cookie: { maxAge: 60000 }
	}));



	//IMPORT CONTROLLERS
	const registrationCtrl = require('./controllers/RegistrationCtrl.js');
	const loginCtrl = require('./controllers/LoginCtrl.js');
	const homeCtrl = require('./controllers/HomeCtrl.js');
	const seriesCtrl = require('./controllers/SeriesCtrl.js');
	const userCtrl = require('./controllers/UserCtrl.js');
	const userWallCtrl = require('./controllers/UserWallCtrl.js')
	const oneSerieCtrl = require('./controllers/OneSerieCtrl.js');



	// INIT CONTROLLERS
	const RegistrationCtrl = new registrationCtrl();
	const LoginCtrl = new loginCtrl();
	const HomeCtrl = new homeCtrl();
	const SeriesCtrl = new seriesCtrl(/*connection*/);
	const UserCtrl = new userCtrl();
	const UserWallCtrl = new userWallCtrl();
	const OneSerieCtrl = new oneSerieCtrl();



 	// ROUTES CREATION
	app.get('/', HomeCtrl.get);
	app.post('/', HomeCtrl.post);

	app.get('/registration', RegistrationCtrl.get);
	app.post('/registration', RegistrationCtrl.post);

	app.get('/login', LoginCtrl.get);
	app.post('/login', LoginCtrl.post);

	app.get('/users', UserCtrl.get);
	app.get('/userWall/:user_id', UserWallCtrl.get)


	// en attente pour la liste des episodes

	app.get('/series', SeriesCtrl.get);
	app.get('/series/:numserie', OneSerieCtrl.get);
	app.get('serie/:numserie/episode/:numepisode', SeriesCtrl.get);


	const port = process.env.PORT || config.default.server.port; 
	 
	app.listen(port, () => { console.log('Server Connected on port : ' + port +' ! ')});


});

 


