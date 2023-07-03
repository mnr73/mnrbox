class roles {
	card = {
		dead: false,
		getOut: false,
		beSimple: false,
		userName: "",
		userId: "",
		roleName: "",
		roleComponent: "",
		nightAwake: true,
	}

	constructor() {
		this.card.class = this.constructor.name
	}


	setUser(userName, userId) {
		this.card.userName = userName
		this.card.userId = userId
	}

	targets() {
		console.log(this.constructor.name);
		console.log(this.roleName);
		console.log(this.info);
	}

	targetBy() {
		console.log(this.card);
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
		this.card.roleName = "گاد فادر"
		this.card.roleComponent = "GodFather"
		this.card.side = "mafia"
		this.card.icon = "mdi:redhat"
		this.card.options = {
			heart: 0
		}
	}
}

export class strongMan extends roles {
	constructor() {
		super()
		this.card.roleName = "مرد قوی"
		this.card.roleComponent = "StrongMan"
		this.card.side = "mafia"
		this.card.icon = "game-icons:biceps"
		this.card.options = {
			shot: 1,
			sameShot: false,
			heart: 0
		}
	}
}

export class nato extends roles {
	constructor() {
		super()
		this.card.roleName = "ناتو"
		this.card.roleComponent = "Nato"
		this.card.side = "mafia"
		this.card.icon = "fa-solid:theater-masks"
		this.card.options = {
			count: 5,
			failsCount: 3,
		}
	}
}

export class natasha extends roles {
	constructor() {
		super()
		this.card.roleName = "ناتاشا"
		this.card.roleComponent = "Natasha"
		this.card.side = "mafia"
		this.card.icon = "game-icons:cowled"
		this.card.options = {
			noVote: true,
			noKick: false,
			alone: true,
		}
	}
}

export class dozd extends roles {
	constructor() {
		super()
		this.card.roleName = "دزد"
		this.card.roleComponent = "Dozd"
		this.card.side = "mafia"
		this.card.icon = "game-icons:balaclava"
		this.card.options = {
			gone: false,
			alone: true,
		}
	}
}

export class afsoongar extends roles {
	constructor() {
		super()
		this.card.roleName = "افسونگر"
		this.card.roleComponent = "Afsoongar"
		this.card.side = "mafia"
		this.card.icon = "game-icons:burning-skull"
		this.card.options = {
			silent: true,
			fastNight: true,
		}
	}
}

export class terrorist extends roles {
	constructor() {
		super()
		this.card.roleName = "تروریست"
		this.card.roleComponent = "Terrorist"
		this.card.side = "mafia"
		this.card.icon = "game-icons:ak47"
		this.card.options = {
			afterVote: true,
			alone: false,
		}
	}
}

export class mashooghe extends roles {
	constructor() {
		super();
		this.card.roleName = "معشوقه"
		this.card.roleComponent = "Mashooghe"
		this.card.side = "mafia"
		this.card.icon = "game-icons:evil-love"
		this.card.options = {
			byVote: true,
			inDay: true,
			inNight: true,
		}
	}
}

export class bazjoo extends roles {
	constructor() {
		super()
		this.card.roleName = "بازجو"
		this.card.roleComponent = "Bazjoo"
		this.card.side = "mafia"
		this.card.icon = "solar:eye-scan-bold"
		this.card.options = {
			count: 1,
		}
	}
}

export class samSaz extends roles {
	constructor() {
		super()
		this.card.roleName = "سم ساز"
		this.card.roleComponent = "SamSaz"
		this.card.side = "mafia"
		this.card.icon = "game-icons:dripping-tube"
		this.card.options = {
			count: 2,
			days: 3,
		}
	}
}

export class negotiator extends roles {
	constructor() {
		super()
		this.card.roleName = "مذاکره کننده"
		this.card.roleComponent = "Negotiator"
		this.card.side = "mafia"
		this.card.icon = "game-icons:pay-money"
		this.card.options = {
			framason: false,
		}
	}
}

export class kharabKar extends roles {
	constructor() {
		super()
		this.card.roleName = "خرابکار"
		this.card.roleComponent = "KharabKar"
		this.card.side = "mafia"
		this.card.icon = "game-icons:luger"
		this.card.options = {
			counts: [
				{ players: 20, value: 3 },
				{ players: 15, value: 2 },
				{ players: 1, value: 1 },
			],
		}
	}
}

export class doctorLekter extends roles {
	constructor() {
		super()
		this.card.roleName = "دکتر لکتر"
		this.card.roleComponent = "DoctorLekter"
		this.card.side = "mafia"
		this.card.icon = "game-icons:plague-doctor-profile"
		this.card.options = {
			self: 100,
		}
	}
}

export class groganGir extends roles {
	constructor() {
		super()
		this.card.roleName = "گروگان گیر"
		this.card.roleComponent = "GroganGir"
		this.card.side = "mafia"
		this.card.icon = "game-icons:usable"
		this.card.options = {
			alone: true,
		}
	}
}

export class spy extends roles {
	constructor() {
		super()
		this.card.roleName = "جاسوس"
		this.card.roleComponent = "Spy"
		this.card.side = "mafia"
		this.card.icon = "game-icons:spy"
		this.card.options = {
			exitWithFramason: false,
		}
	}
}

export class sharlatan extends roles {
	constructor() {
		super()
		this.card.roleName = "شارلاتان"
		this.card.roleComponent = "Sharlatan"
		this.card.side = "mafia"
		this.card.icon = "game-icons:duality-mask"
		this.card.options = {
			count: 100,
			self: 1,
		}
	}
}

export class simpleMafia1 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 1"
		this.card.roleComponent = "SimpleMafia"
		this.card.side = "mafia"
		this.card.icon = "game-icons:bully-minion"
	}
}
export class simpleMafia2 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 2"
		this.card.roleComponent = "SimpleMafia"
		this.card.side = "mafia"
		this.card.icon = "game-icons:bully-minion"
	}
}
export class simpleMafia3 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 3"
		this.card.roleComponent = "SimpleMafia"
		this.card.side = "mafia"
		this.card.icon = "game-icons:bully-minion"
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
		this.card.roleName = "دکتر"
		this.card.roleComponent = "Doctor"
		this.card.side = "city"
		this.card.icon = "game-icons:love-injection"
		this.card.options = {
			counts: [
				{ players: 20, value: 3 },
				{ players: 15, value: 2 },
				{ players: 1, value: 1 },
			],
			self: 1
		}
	}
}

export class detective extends roles {
	constructor() {
		super()
		this.card.roleName = "کاراگاه"
		this.card.roleComponent = "Detective"
		this.card.side = "city"
		this.card.icon = "ic:round-search"
		this.card.options = {
			count: 100,
		}
	}
}

export class sniper extends roles {
	constructor() {
		super()
		this.card.roleName = "اسنایپر"
		this.card.roleComponent = "Sniper"
		this.card.side = "city"
		this.card.icon = "fe:target"
		this.card.options = {
			count: 100,
		}
	}
}

export class farmande extends roles {
	constructor() {
		super()
		this.card.roleName = "فرمانده"
		this.card.roleComponent = "Farmande"
		this.card.side = "city"
		this.card.icon = "game-icons:police-officer-head"
		this.card.options = {
			dieOnFail: true,
		}
	}
}

export class bomber extends roles {
	constructor() {
		super()
		this.card.roleName = "بمبر"
		this.card.roleComponent = "Bomber"
		this.card.side = "city"
		this.card.icon = "game-icons:rolling-bomb"
		this.card.options = {
			count: 5,
		}
	}
}

export class takavar1 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 1"
		this.card.roleComponent = "Takavar"
		this.card.side = "city"
		this.card.icon = "game-icons:ak47u"
		this.card.options = {
			sniperShot: false,
		}
	}
}

export class takavar2 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 2"
		this.card.roleComponent = "Takavar"
		this.card.side = "city"
		this.card.icon = "game-icons:ak47u"
		this.card.options = {
			sniperShot: false,
		}
	}
}

export class takavar3 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 3"
		this.card.roleComponent = "Takavar"
		this.card.side = "city"
		this.card.icon = "game-icons:ak47u"
		this.card.options = {
			sniperShot: false,
		}
	}
}

export class saghi extends roles {
	constructor() {
		super()
		this.card.roleName = "ساقی"
		this.card.roleComponent = "Saghi"
		this.card.side = "city"
		this.card.icon = "game-icons:drink-me"
	}
}

export class fadayi extends roles {
	constructor() {
		super()
		this.card.roleName = "فدایی"
		this.card.roleComponent = "Fadayi"
		this.card.side = "city"
		this.card.icon = "game-icons:hand-bandage"
		this.card.nightAwake = false
	}
}

export class janSakht extends roles {
	constructor() {
		super()
		this.card.roleName = "جان ساخت"
		this.card.roleComponent = "JanSakht"
		this.card.side = "city"
		this.card.icon = "game-icons:horned-helm"
		this.card.options = {
			inquiry: 2,
			heart: 1,
		}
	}
}
export class keshish extends roles {
	constructor() {
		super()
		this.card.roleName = "کشیش"
		this.card.roleComponent = "Keshish"
		this.card.side = "city"
		this.card.icon = "game-icons:robe"
		this.card.options = {
			counts: [
				{ players: 20, value: 3 },
				{ players: 15, value: 2 },
				{ players: 1, value: 1 },
			],
		}
	}
}
export class tofangdar extends roles {
	constructor() {
		super()
		this.card.roleName = "تفنگدار"
		this.card.roleComponent = "Tofangdar"
		this.card.side = "city"
		this.card.icon = "game-icons:revolver"
		this.card.options = {
			count: 3,
			everyNight: 4,
		}
	}
}
export class ghazi extends roles {
	constructor() {
		super()
		this.card.roleName = "قاضی"
		this.card.roleComponent = "Ghazi"
		this.card.side = "city"
		this.card.icon = "game-icons:scales"
		this.card.nightAwake = false
	}
}
export class shahrdar extends roles {
	constructor() {
		super()
		this.card.roleName = "شهردارد"
		this.card.roleComponent = "Shahrdar"
		this.card.side = "city"
		this.card.icon = "game-icons:castle"
		this.card.options = {
			count: 1,
		}
		this.card.nightAwake = false
	}
}
export class framason extends roles {
	constructor() {
		super()
		this.card.roleName = "فراماسون"
		this.card.roleComponent = "Framason"
		this.card.side = "city"
		this.card.icon = "game-icons:pentacle"
	}
}
export class tiler extends roles {
	constructor() {
		super()
		this.card.roleName = "تایلر"
		this.card.roleComponent = "Tiler"
		this.card.side = "city"
		this.card.icon = "game-icons:ram-profile"
	}
}
export class royinTan extends roles {
	constructor() {
		super()
		this.card.roleName = "رویین تن"
		this.card.roleComponent = "RoyinTan"
		this.card.side = "city"
		this.card.icon = "game-icons:android-mask"
		this.card.nightAwake = false
	}
}
export class cowboy extends roles {
	constructor() {
		super()
		this.card.roleName = "کابوی"
		this.card.roleComponent = "Cowboy"
		this.card.side = "city"
		this.card.icon = "game-icons:outback-hat"
		this.card.nightAwake = false
	}
}
export class khabGard extends roles {
	constructor() {
		super()
		this.card.roleName = "خوابگرد"
		this.card.roleComponent = "KhabGard"
		this.card.side = "city"
		this.card.icon = "game-icons:coma"
	}
}
export class ahangar extends roles {
	constructor() {
		super()
		this.card.roleName = "آهنگر"
		this.card.roleComponent = "Ahangar"
		this.card.side = "city"
		this.card.icon = "game-icons:anvil-impact"
	}
}
export class negahban extends roles {
	constructor() {
		super()
		this.card.roleName = "نگهبان"
		this.card.roleComponent = "Negahban"
		this.card.side = "city"
		this.card.icon = "game-icons:winged-sword"
		this.card.options = {
			counts: [
				{ players: 30, value: 3 },
				{ players: 20, value: 2 },
				{ players: 1, value: 1 },
			],
		}
	}
}
export class citizen1 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 1"
		this.card.roleComponent = "Citizen"
		this.card.side = "city"
		this.card.icon = "quill:user-happy"
		this.card.nightAwake = false
	}
}
export class citizen2 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 2"
		this.card.roleComponent = "Citizen"
		this.card.side = "city"
		this.card.icon = "quill:user-happy"
		this.card.nightAwake = false
	}
}
export class citizen3 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 3"
		this.card.roleComponent = "Citizen"
		this.card.side = "city"
		this.card.icon = "quill:user-happy"
		this.card.nightAwake = false
	}
}
export class killer extends roles {
	constructor() {
		super()
		this.card.roleName = "قاتل"
		this.card.roleComponent = "Killer"
		this.card.side = "independent"
		this.card.icon = "game-icons:grim-reaper"
		this.card.options = {
			justOdd: true,
			deepShot: true,
			heart: 100,
		}
	}
}
export class joker extends roles {
	constructor() {
		super()
		this.card.roleName = "جوکر"
		this.card.roleComponent = "Joker"
		this.card.side = "independent"
		this.card.icon = "game-icons:mouth-watering"
		this.card.options = {
			count: 4,
			heart: 100,
		}
		this.card.nightAwake = false
	}
}
export class nostradamus extends roles {
	constructor() {
		super()
		this.card.roleName = "نوستراداموس"
		this.card.roleComponent = "Nostradamus"
		this.card.side = "gray"
		this.card.icon = "game-icons:crystal-ball"
		this.card.options = {
			heart: 100,
		}
	}
}