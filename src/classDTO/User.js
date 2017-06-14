class User{

	constructor(firstName, lastName, mail, pseudo, password, birthday, informations, picture, isModerator, isAdmin, sexe){

		this.firstName = firstName;
		this.lastName = lastName;
		this.mail = mail;
		this.pseudo = pseudo;
		this.password = password;
		this.birthday = birthday;
		this.informations = informations;
		this.picture = picture;
		this.isModerator = isModerator;
		this.isAdmin = isAdmin;
		this.sexe = sexe;
	}

	getPassword() {
		return this.password;
	}



}

module.exports = User;