const crypto = require('crypto');

class Crypt {

	// conf.default.crypt 
	constructor(passToCrypt, algoCrypt, key) {

		this.passToCrypt = passToCrypt;
		this.algoCrypt = algoCrypt;
		this.key = key;
	}
	
	cipher() {

		const cipher = crypto.createCipher(this.algoCrypt,this.key);
		let crypted = cipher.update(this.passToCrypt,'utf8','hex');
		crypted += cipher.final('hex');

		this.crypted = crypted;


		console.log(this.crypted);
		return this.crypted;


	}


	decipher() {

		const decipher = crypto.createDecipher(this.algoCrypt,this.key);
		let dec = decipher.update(this.crypted,'hex','utf8');
		dec += decipher.final('utf8');

		this.dec = dec;

		console.log(dec);
		return this.dec;
	}
}


module.exports = Crypt;