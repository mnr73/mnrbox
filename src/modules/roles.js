import _ from "lodash"

class roles {
	_card = {
		dead: false,
		getOut: false,
		beSimple: false,
		userName: "",
		userId: "",
		roleName: "",
		roleComponent: "",
		nightAwake: true,
	}

	_property = {}

	constructor() {
		this._card.class = this.constructor.name
	}


	setUser(card) {
		this._card = card
	}

	targets() {
		console.log(this.constructor.name);
		console.log(this.roleName);
		console.log(this.info);
	}

	targetBy() {
		console.log(this._card);
	}

	get card() {
		return this._card
	}

	get property() {
		return this._property
	}
}



/**
 * ================================
 * 					mafia roles
 * ================================
 */
export class godFather extends roles {
	constructor() {
		super()
		this._card.roleName = "گاد فادر"
		this._card.roleComponent = "GodFather"
		this._card.side = "mafia"
		this._card.icon = "mdi:redhat"
		this._card.options = {
			heart: 0
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class strongMan extends roles {
	constructor() {
		super()
		this._card.roleName = "مرد قوی"
		this._card.roleComponent = "StrongMan"
		this._card.side = "mafia"
		this._card.icon = "game-icons:biceps"
		this._card.options = {
			shot: 1,
			sameShot: false,
			heart: 0
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "strong_shot",
					name: "شات مافیا",
					kill: true,
					deep: true,
					term: 'night'
				}
			]
		}
	}
}

export class nato extends roles {
	constructor() {
		super()
		this._card.roleName = "ناتو"
		this._card.roleComponent = "Nato"
		this._card.side = "mafia"
		this._card.icon = "fa-solid:theater-masks"
		this._card.options = {
			count: 5,
			failsCount: 3,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "strong_shot",
					name: "شات قوی",
					kill: true,
					deep: true,
					term: 'night'
				}
			]
		}
	}
}

export class natasha extends roles {
	constructor() {
		super()
		this._card.roleName = "ناتاشا"
		this._card.roleComponent = "Natasha"
		this._card.side = "mafia"
		this._card.icon = "game-icons:cowled"
		this._card.options = {
			noVote: true,
			noKick: false,
			alone: true,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "silent",
					name: "سایلنت کردن",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}

export class dozd extends roles {
	constructor() {
		super()
		this._card.roleName = "دزد"
		this._card.roleComponent = "Dozd"
		this._card.side = "mafia"
		this._card.icon = "game-icons:balaclava"
		this._card.options = {
			gone: false,
			alone: true,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "rob_from",
					name: "دزدیدن از",
					kill: false,
					deep: false,
					term: 'night'
				},
				{
					type: "rob_to",
					name: "زدن به",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class afsoongar extends roles {
	constructor() {
		super()
		this._card.roleName = "افسونگر"
		this._card.roleComponent = "Afsoongar"
		this._card.side = "mafia"
		this._card.icon = "game-icons:burning-skull"
		this._card.options = {
			silent: true,
			fastNight: true,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "charm",
					name: "افسون",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}

export class terrorist extends roles {
	constructor() {
		super()
		this._card.roleName = "تروریست"
		this._card.roleComponent = "Terrorist"
		this._card.side = "mafia"
		this._card.icon = "game-icons:ak47"
		this._card.options = {
			afterVote: true,
			alone: false,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "terror",
					name: "ترور",
					kill: true,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}

export class mashooghe extends roles {
	constructor() {
		super();
		this._card.roleName = "معشوقه"
		this._card.roleComponent = "Mashooghe"
		this._card.side = "mafia"
		this._card.icon = "game-icons:evil-love"
		this._card.options = {
			byVote: true,
			inDay: true,
			inNight: true,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class bazjoo extends roles {
	constructor() {
		super()
		this._card.roleName = "بازجو"
		this._card.roleComponent = "Bazjoo"
		this._card.side = "mafia"
		this._card.icon = "solar:eye-scan-bold"
		this._card.options = {
			count: 1,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "research",
					name: "بازجویی",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class samSaz extends roles {
	constructor() {
		super()
		this._card.roleName = "سم ساز"
		this._card.roleComponent = "SamSaz"
		this._card.side = "mafia"
		this._card.icon = "game-icons:dripping-tube"
		this._card.options = {
			count: 2,
			days: 3,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "poison",
					name: "بازجویی",
					kill: true,
					deep: true,
					term: 'all'
				}
			]
		}
	}
}

export class negotiator extends roles {
	constructor() {
		super()
		this._card.roleName = "مذاکره کننده"
		this._card.roleComponent = "Negotiator"
		this._card.side = "mafia"
		this._card.icon = "game-icons:pay-money"
		this._card.options = {
			framason: false,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "negotiation",
					name: "مذاکره",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class kharabKar extends roles {
	constructor() {
		super()
		this._card.roleName = "خرابکار"
		this._card.roleComponent = "KharabKar"
		this._card.side = "mafia"
		this._card.icon = "game-icons:luger"
		this._card.options = {
			counts: [
				{ players: 20, value: 3 },
				{ players: 15, value: 2 },
				{ players: 1, value: 1 },
			],
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "sabotage",
					name: "خرابکاری",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}

export class doctorLekter extends roles {
	constructor() {
		super()
		this._card.roleName = "دکتر لکتر"
		this._card.roleComponent = "DoctorLekter"
		this._card.side = "mafia"
		this._card.icon = "game-icons:plague-doctor-profile"
		this._card.options = {
			self: 100,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "save_mafia",
					name: "نجات مافیا",
					kill: false,
					deep: false,
					save: true,
					term: 'night'
				}
			]
		}
	}
}

export class groganGir extends roles {
	constructor() {
		super()
		this._card.roleName = "گروگان گیر"
		this._card.roleComponent = "GroganGir"
		this._card.side = "mafia"
		this._card.icon = "game-icons:usable"
		this._card.options = {
			alone: true,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "hostage",
					name: "گروگان",
					kill: false,
					deep: false,
					lock: false,
					term: 'night'
				}
			]
		}
	}
}

export class spy extends roles {
	constructor() {
		super()
		this._card.roleName = "جاسوس"
		this._card.roleComponent = "Spy"
		this._card.side = "mafia"
		this._card.icon = "game-icons:spy"
		this._card.options = {
			exitWithFramason: false,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class sharlatan extends roles {
	constructor() {
		super()
		this._card.roleName = "شارلاتان"
		this._card.roleComponent = "Sharlatan"
		this._card.side = "mafia"
		this._card.icon = "game-icons:duality-mask"
		this._card.options = {
			count: 100,
			self: 1,
		}
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				},
				{
					type: "detect_reverce",
					name: "استعلام معکوس",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class simpleMafia1 extends roles {
	constructor() {
		super()
		this._card.roleName = "مافیا ساده 1"
		this._card.roleComponent = "SimpleMafia"
		this._card.side = "mafia"
		this._card.icon = "game-icons:bully-minion"
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}
export class simpleMafia2 extends roles {
	constructor() {
		super()
		this._card.roleName = "مافیا ساده 2"
		this._card.roleComponent = "SimpleMafia"
		this._card.side = "mafia"
		this._card.icon = "game-icons:bully-minion"
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}
export class simpleMafia3 extends roles {
	constructor() {
		super()
		this._card.roleName = "مافیا ساده 3"
		this._card.roleComponent = "SimpleMafia"
		this._card.side = "mafia"
		this._card.icon = "game-icons:bully-minion"
		this._property = {
			acts: [
				{
					type: "mafia_shot",
					name: "شات مافیا",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

/**
 * ================================
 * 					city roles
 * ================================
 */

export class doctor extends roles {
	constructor() {
		super()
		this._card.roleName = "دکتر"
		this._card.roleComponent = "Doctor"
		this._card.side = "city"
		this._card.icon = "game-icons:love-injection"
		this._card.options = {
			counts: [
				{ players: 20, value: 3 },
				{ players: 15, value: 2 },
				{ players: 1, value: 1 },
			],
			self: 1
		}
		this._property = {
			acts: [
				{
					type: "save_city",
					name: "نجات شهر",
					kill: false,
					deep: false,
					save: true,
					term: 'night'
				}
			]
		}
	}
}

export class detective extends roles {
	constructor() {
		super()
		this._card.roleName = "کاراگاه"
		this._card.roleComponent = "Detective"
		this._card.side = "city"
		this._card.icon = "ic:round-search"
		this._card.options = {
			count: 100,
		}
		this._property = {
			acts: [
				{
					type: "detect_mafia",
					name: "استعلام مافیا",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class sniper extends roles {
	constructor() {
		super()
		this._card.roleName = "اسنایپر"
		this._card.roleComponent = "Sniper"
		this._card.side = "city"
		this._card.icon = "fe:target"
		this._card.options = {
			count: 100,
		}
		this._property = {
			acts: [
				{
					type: "sniper_shot",
					name: "شلیک",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class farmande extends roles {
	constructor() {
		super()
		this._card.roleName = "فرمانده"
		this._card.roleComponent = "Farmande"
		this._card.side = "city"
		this._card.icon = "game-icons:police-officer-head"
		this._card.options = {
			dieOnFail: true,
		}
	}
}

export class bomber extends roles {
	constructor() {
		super()
		this._card.roleName = "بمبر"
		this._card.roleComponent = "Bomber"
		this._card.side = "city"
		this._card.icon = "game-icons:rolling-bomb"
		this._card.options = {
			count: 5,
		}
		this._property = {
			acts: [
				{
					type: "bomb",
					name: "بمب",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}

export class takavar1 extends roles {
	constructor() {
		super()
		this._card.roleName = "تکاور 1"
		this._card.roleComponent = "Takavar"
		this._card.side = "city"
		this._card.icon = "game-icons:ak47u"
		this._card.options = {
			sniperShot: false,
		}
		this._property = {
			acts: [
				{
					type: "commando_shot",
					name: "شلیک",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class takavar2 extends roles {
	constructor() {
		super()
		this._card.roleName = "تکاور 2"
		this._card.roleComponent = "Takavar"
		this._card.side = "city"
		this._card.icon = "game-icons:ak47u"
		this._card.options = {
			sniperShot: false,
		}
		this._property = {
			acts: [
				{
					type: "commando_shot",
					name: "شلیک",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class takavar3 extends roles {
	constructor() {
		super()
		this._card.roleName = "تکاور 3"
		this._card.roleComponent = "Takavar"
		this._card.side = "city"
		this._card.icon = "game-icons:ak47u"
		this._card.options = {
			sniperShot: false,
		}
		this._property = {
			acts: [
				{
					type: "commando_shot",
					name: "شلیک",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}

export class saghi extends roles {
	constructor() {
		super()
		this._card.roleName = "ساقی"
		this._card.roleComponent = "Saghi"
		this._card.side = "city"
		this._card.icon = "game-icons:drink-me"
		this._property = {
			acts: [
				{
					type: "drunk",
					name: "مست کردن",
					kill: false,
					deep: false,
					term: 'all'
				}
			]
		}
	}
}

export class fadayi extends roles {
	constructor() {
		super()
		this._card.roleName = "فدایی"
		this._card.roleComponent = "Fadayi"
		this._card.side = "city"
		this._card.icon = "game-icons:hand-bandage"
		this._card.nightAwake = false
		this._property = {
			acts: [
				{
					type: "sacrifice",
					name: "فدا شدن",
					kill: false,
					deep: false,
					term: 'all'
				}
			]
		}
	}
}

export class janSakht extends roles {
	constructor() {
		super()
		this._card.roleName = "جان ساخت"
		this._card.roleComponent = "JanSakht"
		this._card.side = "city"
		this._card.icon = "game-icons:horned-helm"
		this._card.options = {
			inquiry: 2,
			heart: 1,
		}
	}
}
export class keshish extends roles {
	constructor() {
		super()
		this._card.roleName = "کشیش"
		this._card.roleComponent = "Keshish"
		this._card.side = "city"
		this._card.icon = "game-icons:robe"
		this._card.options = {
			counts: [
				{ players: 20, value: 3 },
				{ players: 15, value: 2 },
				{ players: 1, value: 1 },
			],
		},
			this._property = {
				acts: [
					{
						type: "priest_save",
						name: "دعای روحانی",
						kill: false,
						deep: false,
						term: 'all'
					}
				]
			}
	}
}
export class tofangdar extends roles {
	constructor() {
		super()
		this._card.roleName = "تفنگدار"
		this._card.roleComponent = "Tofangdar"
		this._card.side = "city"
		this._card.icon = "game-icons:revolver"
		this._card.options = {
			count: 3,
			everyNight: 4,
		}
		this._property = {
			acts: [
				{
					type: "give_gun",
					name: "دادن اسلحه",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}
export class ghazi extends roles {
	constructor() {
		super()
		this._card.roleName = "قاضی"
		this._card.roleComponent = "Ghazi"
		this._card.side = "city"
		this._card.icon = "game-icons:scales"
		this._card.nightAwake = false
	}
}
export class shahrdar extends roles {
	constructor() {
		super()
		this._card.roleName = "شهردارد"
		this._card.roleComponent = "Shahrdar"
		this._card.side = "city"
		this._card.icon = "game-icons:castle"
		this._card.options = {
			count: 1,
		}
		this._card.nightAwake = false
	}
}
export class framason extends roles {
	constructor() {
		super()
		this._card.roleName = "فراماسون"
		this._card.roleComponent = "Framason"
		this._card.side = "city"
		this._card.icon = "game-icons:pentacle"
		this._property = {
			acts: [
				{
					type: "mason_awake",
					name: "بیدار کردن",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}
export class tiler extends roles {
	constructor() {
		super()
		this._card.roleName = "تایلر"
		this._card.roleComponent = "Tiler"
		this._card.side = "city"
		this._card.icon = "game-icons:ram-profile"
		this._property = {
			acts: [
				{
					type: "mason_awake",
					name: "بیدار کردن",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}
export class royinTan extends roles {
	constructor() {
		super()
		this._card.roleName = "رویین تن"
		this._card.roleComponent = "RoyinTan"
		this._card.side = "city"
		this._card.icon = "game-icons:android-mask"
		this._card.nightAwake = false
	}
}
export class cowboy extends roles {
	constructor() {
		super()
		this._card.roleName = "کابوی"
		this._card.roleComponent = "Cowboy"
		this._card.side = "city"
		this._card.icon = "game-icons:outback-hat"
		this._card.nightAwake = false
		this._property = {
			acts: [
				{
					type: "lasso",
					name: "کمند",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}
export class khabGard extends roles {
	constructor() {
		super()
		this._card.roleName = "خوابگرد"
		this._card.roleComponent = "KhabGard"
		this._card.side = "city"
		this._card.icon = "game-icons:coma"
	}
}
export class ahangar extends roles {
	constructor() {
		super()
		this._card.roleName = "آهنگر"
		this._card.roleComponent = "Ahangar"
		this._card.side = "city"
		this._card.icon = "game-icons:anvil-impact"
		this._property = {
			acts: [
				{
					type: "smithy_armon",
					name: "زره",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}
export class negahban extends roles {
	constructor() {
		super()
		this._card.roleName = "نگهبان"
		this._card.roleComponent = "Negahban"
		this._card.side = "city"
		this._card.icon = "game-icons:winged-sword"
		this._card.options = {
			counts: [
				{ players: 30, value: 3 },
				{ players: 20, value: 2 },
				{ players: 1, value: 1 },
			],
		}
		this._property = {
			acts: [
				{
					type: "guard",
					name: "نگه بانی",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}
export class citizen1 extends roles {
	constructor() {
		super()
		this._card.roleName = "شهر ساده 1"
		this._card.roleComponent = "Citizen"
		this._card.side = "city"
		this._card.icon = "quill:user-happy"
		this._card.nightAwake = false
	}
}
export class citizen2 extends roles {
	constructor() {
		super()
		this._card.roleName = "شهر ساده 2"
		this._card.roleComponent = "Citizen"
		this._card.side = "city"
		this._card.icon = "quill:user-happy"
		this._card.nightAwake = false
	}
}
export class citizen3 extends roles {
	constructor() {
		super()
		this._card.roleName = "شهر ساده 3"
		this._card.roleComponent = "Citizen"
		this._card.side = "city"
		this._card.icon = "quill:user-happy"
		this._card.nightAwake = false
	}
}
export class killer extends roles {
	constructor() {
		super()
		this._card.roleName = "قاتل"
		this._card.roleComponent = "Killer"
		this._card.side = "independent"
		this._card.icon = "game-icons:grim-reaper"
		this._card.options = {
			justOdd: true,
			deepShot: true,
			heart: 100,
		}
		this._property = {
			acts: [
				{
					type: "killer_shot",
					name: "شلیک",
					kill: true,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}
export class joker extends roles {
	constructor() {
		super()
		this._card.roleName = "جوکر"
		this._card.roleComponent = "Joker"
		this._card.side = "independent"
		this._card.icon = "game-icons:mouth-watering"
		this._card.options = {
			count: 4,
			heart: 100,
		}
		this._card.nightAwake = false
		this._property = {
			acts: [
				{
					type: "joker_smile",
					name: "خنده جوکر",
					kill: false,
					deep: false,
					term: 'day'
				}
			]
		}
	}
}
export class nostradamus extends roles {
	constructor() {
		super()
		this._card.roleName = "نوستراداموس"
		this._card.roleComponent = "Nostradamus"
		this._card.side = "gray"
		this._card.icon = "game-icons:crystal-ball"
		this._card.options = {
			heart: 100,
		}
		this._property = {
			acts: [
				{
					type: "predict",
					name: "پیش بینی",
					kill: false,
					deep: false,
					term: 'night'
				}
			]
		}
	}
}