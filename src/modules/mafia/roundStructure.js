import _ from "lodash"

export default function roundsStructure(game) {
	let rounds_structure = {
		stepNumber: 0,
		steps: {
			night: {
				number: 0,
				type: "night",
				active: true,
				name: "شب",
				acts: [],
			},
			day: {
				number: 1,
				type: "day",
				active: false,
				name: "روز",
				acts: [],
			},
			vote_1: {
				number: 2,
				type: "vote_1",
				active: false,
				name: "رای 1",
				votes: {},
				acts: [],
			},
			defense: {
				number: 3,
				type: "defense",
				active: false,
				name: "دفاع",
				acts: [],
			},
		},
	};

	if (_.find(game.roles, ["class", "ghazi"])) {
		rounds_structure.steps.ghazi = {
			number: _.max(_.map(rounds_structure.steps, "number")) + 1,
			type: "ghazi",
			active: false,
			name: "قاضی",
			acts: [],
		};
	}
	rounds_structure.steps.vote_2 = {
		number: _.max(_.map(rounds_structure.steps, "number")) + 1,
		type: "vote_2",
		active: false,
		name: "رای 2",
		votes: {},
		acts: [],
	};
	if (
		_.find(
			game.roles,
			(role) => role.class == "shahrdar" || role.class == "fadayi"
		)
	) {
		rounds_structure.steps.shahrdar = {
			number: _.max(_.map(rounds_structure.steps, "number")) + 1,
			type: "shahrdar",
			active: false,
			name: "شهردار و فدایی",
			acts: [],
		};
	}

	return rounds_structure;
}
