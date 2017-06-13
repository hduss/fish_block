
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

	/*connection.query('UPDATE users SET firstName = ? WHERE user_id = ?', ['pieuvre', "1"], (error, results, fields) => {
	  if (error) throw error;
	  console.log("UPDATED");
	});*/


 	/*connection.query('INSERT INTO users SET firstName=?',  "JAMBONBEURRE", (error, results, fields) => {
 		console.log('insertion OKKKKKK!!!');
 	})*/

	/*connection.query('DELETE FROM users WHERE user_id = 1', (error, results, fields) => {
	  if (error) throw error;
	  console.log('deleted ' + fields + ' rows');
	});*/




	/*const urlencoderParser = bodyParser.urlencoded({extended: false});*/


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
	const seriesCtrl = require('./controllers/SeriesCtrl');



	// INIT CONTROLLERS
	const RegistrationCtrl = new registrationCtrl();
	const LoginCtrl = new loginCtrl();
	const HomeCtrl = new homeCtrl();
	const SeriesCtrl = new seriesCtrl(/*connection*/);



 	// ROUTES CREATION
	app.get('/', HomeCtrl.get);

	app.get('/registration', RegistrationCtrl.get);
	app.post('/registration', RegistrationCtrl.post);

	app.get('/login', LoginCtrl.get);
	app.post('/login', LoginCtrl.post);

	app.get('/series', SeriesCtrl.get);


	// en attente pour la liste des episodes
	app.get('serie/:numserie/episodes', SeriesCtrl.get);
	app.get('serie/:numserie/episode/:numepisode', SeriesCtrl.get);




	const port = process.env.PORT || config.default.server.port; 
	 
	app.listen(port, () => { console.log('Server Connected on port : ' + port +' ! ')});


});

 


