const TVDB = require('node-tvdb');

const tvdb = new TVDB('6656E759AFC49A1A');
 
const SQLmoves = require('../repositoryDAO/SQLmoves.repository.js');



class populate{

	constructor() {

		const sqlmoves = new SQLmoves();

	}

insertSerie(nameSerie) {

	tvdb.getSeriesByName(nameSerie)

	    .then(response => {
	    	console.log(response)};

	    	sqlmoves.insertSerie(response.seriesName,"realisateur1", response.overview, 0, 0,  ""))
	    		.then( results => console.log("INSERT", results))
	    		.catch((error) => console.log(error));

	    .catch(error => { console.log(error)});
		
	}

	insertEpisode(idSerie){

		tvdb.getEpisodesBySeriesId(153021)
	    .then(response => { 
	    	console.log(response) 

	    })
	    .catch(error => { handle error });
		
	}

}

