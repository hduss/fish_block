const TVDB = require('node-tvdb');

const tvdb = new TVDB('6656E759AFC49A1A');
 
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');

const JSONtrans = require('../services/JSONtrans.js');


class Populate{

	constructor() {

		this.sqlmoves = new SQLmoves();
		this.jsontrans = new JSONtrans();

	}



insertSerie(nameSerie) {

	tvdb.getSeriesByName(nameSerie)

	    .then(response => {
	    	

	    	const responseJson = this.jsontrans.transform(response);

	    	console.log('RESULT TRANSFORM >>>> ', responseJson.overview);
	    	console.log(response);
	    	this.sqlmoves.insertSerie(responseJson.seriesName,"realisateur1", responseJson.overview, 0, 0,  " ", responseJson.banner)
	    		.then( results => console.log("INSERT >>>", results))
	    		.catch((error) => console.log(error));
	    })
	    .catch(error => console.log(error));
		
	}





	insertEpisodes(idSerie){

		tvdb.getEpisodesBySeriesId(153021)
	    .then(response => { 
	    	sqlmoves.insertEpisode()
	    	.then( results => console.log("INSERT", results))
	    	.catch((error) => console.log(error));

	    })
	    .catch(error => console.log(error));
		
	}

}

module.exports = Populate;

