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
		this.mafia.players = _.reject(this.mafia.players, (o) => {
			return _.find(players, ['class', o.class]) == null;
		})
		players = _.reject(players, (n) => {
			return _.find(this.mafia.players, ['class', n.class]);
		})
		players = this.mafia.players = [...this.mafia.players, ...players]
		this.update()
		return this.getPlayers();
	}

	getPlayers() {
		return this.mafia.players;
	}

	deletePlayers() {
		delete this.mafia.players
		this.update()
	}

	updateGame(game) {
		this.mafia.game = _.pick(game, ['lastRoundNumber', 'rounds', 'end'])
		this.update()
		return this.getGame();
	}

	getGame() {
		return this.mafia.game;
	}

	deleteGame() {
		delete this.mafia.game
		this.update()
	}
}

export default mafia;