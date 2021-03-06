
const express = require('express');
const mysql = require('mysql');
// yamljs, parse, stringify and load functions
const twig = require ('twig');
const path = require('path');
// to read input forms
const yaml = require('yamljs');
// yaml file for database connection
const config = yaml.load('config/configDb.yml');	
// to recover input data
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
// new instance to use tvDb API
const TVDB = require('node-tvdb');
const tvdb = new TVDB(config.default.tvDb.key);
// to populate database withe theTvDb API
const Populate = require('./services/Populate.js');
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
	// express.static to use static files like css/js client/img
	app.use(express.static(path.join(__dirname, '../public')));



	//IMPORT CONTROLLERS
	const registrationCtrl = require('./controllers/RegistrationCtrl.js');
	const loginCtrl = require('./controllers/LoginCtrl.js');
	const homeCtrl = require('./controllers/HomeCtrl.js');
	const seriesCtrl = require('./controllers/SeriesCtrl.js');
	const userCtrl = require('./controllers/UserCtrl.js');
	const userWallCtrl = require('./controllers/UserWallCtrl.js')
	const oneSerieCtrl = require('./controllers/OneSerieCtrl.js');
	const menuCtrl = require('./controllers/MenuCtrl.js');

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
	app.get('/userWall/:user_id', UserWallCtrl.get);

	app.get('/series', SeriesCtrl.get);
	app.post('/series', SeriesCtrl.post);
	app.get('/series/:numserie', OneSerieCtrl.get);
	app.post('/series/:numserie', OneSerieCtrl.post);
	//app.get('/series/:numserie/episodes', EpisodesCtrl.get);
	//app.get('serie/:numserie/episode/:numepisode', SeriesCtrl.get);

	// routes without controllers -> just display 
	app.get('/contact', (req, res) => {res.render('app/contact.html.twig');});
	app.get('/mentions', (req, res) => {res.render('app/mentions.html.twig');});
	app.get('/cgu', (req, res) => {res.render('app/cgu.html.twig');});
	app.get('/faq', (req, res) => {res.render('app/faq.html.twig');});

	const port = process.env.PORT || config.default.server.port; 
	 
	app.listen(port, () => { console.log('Server Connected on port : ' + port +' ! ')});


});

 


/*------------------------------- GET series and POPULATE DB-----------------
tvdb.getEpisodesBySeriesId(153021)
	.then(response => {
		console.log(response);
	})

	.catch((error) => console.log(error));
   
 
tvdb.getSeriesByName('the walking dead')
    .then(response => {
    	console.log(response)})
    .catch(error => { console.log(error)});

const populate = new Populate();



populate.insertEpisodes(153021, 2);

--------------------------------------------------------------------------------*/