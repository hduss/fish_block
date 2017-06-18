const TVDB = require('node-tvdb');

const tvdb = new TVDB('6656E759AFC49A1A');
 
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');

const JSONtrans = require('../services/JSONtrans.js');


class Populate{

	constructor() {

		this.sqlmoves = new SQLmoves();
		this.jsontrans = new JSONtrans();

	}


// to insert serie in database mysql after search by name with te api the tvDb
insertSerie(nameSerie) {

	tvdb.getSeriesByName(nameSerie)

	    .then(response => {
	    	

	    	const responseJson = this.jsontrans.transform(response);

	    	console.log('RESULT TRANSFORM >>>> ', responseJson.overview);
	    	console.log(response);
	    	this.sqlmoves.insertSerie(responseJson.seriesName,"realisateur1", responseJson.overview, 0, 0,  " ", responseJson.banner)
	    		.then(results => console.log("INSERT >>>", results))
	    		.catch((error) => console.log(error));
	    })
	    .catch(error => console.log(error));
		
	}


/*------------------------INSERT EPISODES FUNCTION -------------------------*/

/*
	insertEpisodes(idSerie, id_db){

		tvdb.getEpisodesBySeriesId(idSerie)
	    .then(response => { 

	    	//console.log(response);

	    	const responses = JSON.stringify(response);

	    	console.log(responses);

	    	for (let i = 0, i < responses.length, i++) {
	    		console.log(responses[i]);
		    	this.sqlmoves.insertEpisodes(response[i].episodeName, response[i].overview, id_db)
		    	.then( results => console.log("INSERT", results))
		    	.catch((error) => console.log(error));
	    	}


	    })
	    .catch(error => console.log(error));
		
	}*/

/*-------------------------------------------------------------------------*/


}

module.exports = Populate;



