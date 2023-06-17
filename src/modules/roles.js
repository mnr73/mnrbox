class roles {
	card = {
		'dead': false,
		'getOut': false,
		'beSimple': false,
		'userName': "",
		'userId': "",
		'roleName': "",
		'roleComponent': "",
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
class godFather extends roles {
	constructor() {
		super()
		this.card.roleName = "گاد فادر"
		this.card.roleComponent = "GodFather"
		this.card.side = "mafia"
		this.card.negativeInquiry = { default: 100, value: 100 }
		this.card.armor = { default: 0, value: 0 }
	}
}

class strongMan extends roles {
	constructor() {
		super()
		this.card.roleName = "مرد قوی"
		this.card.roleComponent = "StrongMan"
		this.card.side = "mafia"
		this.card.shot = { default: 1, value: 1 }
		this.card.sameShot = { default: false, value: false }
		this.card.armor = { default: 0, value: 0 }
	}
}

class nato extends roles {
	constructor() {
		super()
		this.card.roleName = "ناتو"
		this.card.roleComponent = "Nato"
		this.card.side = "mafia",
		this.card.failsCount = { default: 3, value: 3 }
	}
}

class natasha extends roles {
	constructor() {
		super()
		this.card.roleName = "ناتاشا"
		this.card.roleComponent = "Natasha"
		this.card.side = "mafia",
		this.card.noVote = { default: true, value: true }
		this.card.noKick = { default: false, value: false }
	}
}

class afsoongar extends roles {
	constructor() {
		super()
		this.card.roleName = "افسونگر"
		this.card.roleComponent = "Afsoongar"
		this.card.side = "mafia"
		this.card.silent = { default: true, value: true }
		this.card.fastNight = { default: true, value: true }
	}
}

class terrorist extends roles {
	constructor() {
		super()
		this.card.roleName = "تروریست"
		this.card.roleComponent = "Terrorist"
		this.card.side = "mafia"
		this.card.afterVote = { default: true, value: true }
		this.card.alone = { default: false, value: false }
	}
}

class mashooghe extends roles {
	constructor() {
		super();
		this.card.roleName = "معشوقه"
		this.card.roleComponent = "Mashooghe"
		this.card.side = "mafia"
		this.card.byVote = { default: true, value: true }
		this.card.inDay = { default: true, value: true }
		this.card.inNight = { default: true, value: true }
	}
}

class bazjoo extends roles {
	constructor() {
		super()
		this.card.roleName = "بازجو"
		this.card.roleComponent = "Bazjoo"
		this.card.side = "mafia"
		this.card.count = { default: 3, value: 3 }
	}
}

class samSaz extends roles {
	constructor() {
		super()
		this.card.roleName = "سم ساز"
		this.card.roleComponent = "SamSaz"
		this.card.side = "mafia"
		this.card.count = { default: 2, value: 2 }
		this.card.days = { default: 3, value: 3 }
	}
}

class negotiator extends roles {
	constructor() {
		super()
		this.card.roleName = "مذاکره کننده"
		this.card.roleComponent = "Negotiator"
		this.card.side = "mafia"
		this.card.framason = { default: false, value: false }
	}
}

class kharabKar extends roles {
	constructor() {
		super()
		this.card.roleName = "خرابکار"
		this.card.roleComponent = "KharabKar"
		this.card.side = "mafia"
	}
}

class doctorLekter extends roles {
	constructor() {
		super()
		this.card.roleName = "دکتر لکتر"
		this.card.roleComponent = "DoctorLekter"
		this.card.side = "mafia"
	}
}

class groganGir extends roles {
	constructor() {
		super()
		this.card.roleName = "گروگان گیر"
		this.card.roleComponent = "GroganGir"
		this.card.side = "mafia"
	}
}

class shabKhosb extends roles {
	constructor() {
		super()
		this.card.roleName = "شب خسب"
		this.card.roleComponent = "ShabKhosb"
		this.card.side = "mafia"
	}
}

class spy extends roles {
	constructor() {
		super()
		this.card.roleName = "جاسوس"
		this.card.roleComponent = "Spy"
		this.card.side = "mafia"
	}
}

class sharlatan extends roles {
	constructor() {
		super()
		this.card.roleName = "شارلاتان"
		this.card.roleComponent = "Sharlatan"
		this.card.side = "mafia"
	}
}

class simpleMafia1 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 1"
		this.card.roleComponent = "SimpleMafia1"
		this.card.side = "mafia"
	}
}
class simpleMafia2 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 2"
		this.card.roleComponent = "SimpleMafia2"
		this.card.side = "mafia"
	}
}
class simpleMafia3 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 3"
		this.card.roleComponent = "SimpleMafia3"
		this.card.side = "mafia"
	}
}

/**
 * ================================
 * 					city roles
 * ================================
 */

class doctor extends roles {
	constructor() {
		super()
		this.card.roleName = "دکتر"
		this.card.roleComponent = "Doctor"
		this.card.side = "city"
	}
}

class detective extends roles {
	constructor() {
		super()
		this.card.roleName = "کاراگاه"
		this.card.roleComponent = "Detective"
		this.card.side = "city"
	}
}

class sniper extends roles {
	constructor() {
		super()
		this.card.roleName = "اسنایپر"
		this.card.roleComponent = "Sniper"
		this.card.side = "city"
	}
}

class farmande extends roles {
	constructor() {
		super()
		this.card.roleName = "فرمانده"
		this.card.roleComponent = "Farmande"
		this.card.side = "city"
	}
}

class bomber extends roles {
	constructor() {
		super()
		this.card.roleName = "بمبر"
		this.card.roleComponent = "Bomber"
		this.card.side = "city"
	}
}

class takavar1 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 1"
		this.card.roleComponent = "Takavar1"
		this.card.side = "city"
	}
}

class takavar2 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 2"
		this.card.roleComponent = "Takavar2"
		this.card.side = "city"
	}
}

class takavar3 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 3"
		this.card.roleComponent = "Takavar3"
		this.card.side = "city"
	}
}

class saghi extends roles {
	constructor() {
		super()
		this.card.roleName = "ساقی"
		this.card.roleComponent = "Saghi"
		this.card.side = "city"
	}
}

class fadayi extends roles {
	constructor() {
		super()
		this.card.roleName = "فدایی"
		this.card.roleComponent = "Fadayi"
		this.card.side = "city"
	}
}

class janSakht extends roles {
	constructor() {
		super()
		this.card.roleName = "جان ساخت"
		this.card.roleComponent = "JanSakht"
		this.card.side = "city"
	}
}
class keshish extends roles {
	constructor() {
		super()
		this.card.roleName = "کشیش"
		this.card.roleComponent = "Keshish"
		this.card.side = "city"
	}
}
class tofangdar extends roles {
	constructor() {
		super()
		this.card.roleName = "تفنگدار"
		this.card.roleComponent = "Tofangdar"
		this.card.side = "city"
	}
}
class ghazi extends roles {
	constructor() {
		super()
		this.card.roleName = "قاضی"
		this.card.roleComponent = "Ghazi"
		this.card.side = "city"
	}
}
class shahrdar extends roles {
	constructor() {
		super()
		this.card.roleName = "شهردارد"
		this.card.roleComponent = "Shahrdar"
		this.card.side = "city"
	}
}
class framason extends roles {
	constructor() {
		super()
		this.card.roleName = "فراماسون"
		this.card.roleComponent = "Framason"
		this.card.side = "city"
	}
}
class tiler extends roles {
	constructor() {
		super()
		this.card.roleName = "تایلر"
		this.card.roleComponent = "Tiler"
		this.card.side = "city"
	}
}
class citizen1 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 1"
		this.card.roleComponent = "citizen1"
		this.card.side = "city"
	}
}
class citizen2 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 2"
		this.card.roleComponent = "citizen2"
		this.card.side = "city"
	}
}
class citizen3 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 3"
		this.card.roleComponent = "citizen3"
		this.card.side = "city"
	}
}

export {
	godFather, strongMan, nato, natasha, afsoongar, terrorist, mashooghe,
	bazjoo, samSaz, negotiator, kharabKar, doctorLekter, groganGir, shabKhosb,
	spy, sharlatan, simpleMafia1, simpleMafia2, simpleMafia3,

	doctor, detective, sniper, farmande, bomber, takavar1, takavar2, takavar3, saghi,
	fadayi, janSakht, keshish, tofangdar, ghazi, shahrdar, framason, tiler,
	citizen1, citizen2, citizen3
};