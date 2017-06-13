//DTO


class userDTO {

	constructor(firstName, lastName, mail, pseudo, password, age, informations, picture, isModerator, isAdmin, sexe) {
	
		this.firstName = firstName;
		this.lastName = lastName;
		this.mail = mail
		this.pseudo = pseudo;
		this.password = password;
		this.age = age;
		this.informations = informations;
		this.isModerator = isModerator;
		this.isAdmin = isAdmin;
		this.sexe = sexe;

	}

	/*getFirstName() {
		return this.firstname;
	}


	getLastName() {
		return this.lastName;
	}

	getPseudo() {
		return this.pseudo;
	}

	getMail() {
		return this.mail;
	}

	getAge() {
		return this.age;
	}

	getInformations() {
		return this.informations;
	}

	getSexe() {
		return this.getSexe;
	}

	setFirstName(firstName) {

		this.firstName = firstName;
	}

	setFirstName(lastName) {

		this.lastName = lastName;
	}
	setFirstName(firstName) {

		this.firstName = firstName;
	}*/
}

module.exports = userDTO;


