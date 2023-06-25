import _ from "lodash"

class mafia {
	constructor() {
		this.mafia = localStorage.getItem("mafia");
		this.mafia = this.mafia == null ? {
			users: []
		} : JSON.parse(this.mafia)
		this.update()
	}

	update() {
		this.mafia.users = _.uniqBy(this.mafia.users, "name")
		localStorage.setItem("mafia", JSON.stringify(this.mafia));
	}

	updateUsers(users) {
		this.mafia.users = users
		this.update()
		return this.getUsers();
	}

	updateRoles(roles) {
		this.mafia.roles = roles
		this.update()
		return this.getRoles();
	}

	deleteRoles() {
		console.log('test');
		delete this.mafia.roles
		this.update()
	}

	// addUser(name) {
	// 	name = trim(name)
	// 	if(!name) return
	// 	this.mafia.users.push({
	// 		name: name,
	// 		active: true,
	// 	});
	// 	this.update()
	// 	return this.getUsers();
	// }

	getUsers() {
		this.mafia.users = _.orderBy(this.mafia.users, 'active', 'desc')
		return this.mafia.users;
	}

	getRoles() {
		return this.mafia.roles;
	}
}

export default mafia;