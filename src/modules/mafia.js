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

	getUsers() {
		// this.mafia.users = _.orderBy(this.mafia.users, 'active', 'desc')
		return this.mafia.users;
	}

	getActiveUsers() {
		return _.filter(this.getUsers(), 'active');
	}

	updateRoles(roles) {
		this.mafia.roles = roles
		this.update()
		return this.getRoles();
	}

	deleteRoles() {
		delete this.mafia.roles
		this.update()
	}

	getRoles() {
		return this.mafia.roles;
	}

	updatePlayers(players) {
		this.mafia.players = players
		this.update()
		return this.getRoles();
	}

	getPlayers() {
		return this.mafia.players;
	}

	updateSetting(setting) {
		this.mafia.setting = setting
		this.update()
		return this.getSetting();
	}

	getSetting() {
		return this.mafia.setting;
	}
}

export default mafia;