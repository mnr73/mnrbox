
import GodFather from "@/components/mafia/roles/GodFather.vue"
import StrongMan from "@/components/mafia/roles/StrongMan.vue"
import Nato from "@/components/mafia/roles/Nato.vue";
import Natasha from "@/components/mafia/roles/Natasha.vue";
import Afsoongar from "@/components/mafia/roles/Afsoongar.vue";
import Terrorist from "@/components/mafia/roles/Terrorist.vue";
import Mashooghe from "@/components/mafia/roles/Mashooghe.vue";
import Bazjoo from "@/components/mafia/roles/Bazjoo.vue";
import SamSaz from "@/components/mafia/roles/SamSaz.vue";
import Negotiator from "@/components/mafia/roles/Negotiator.vue";
import KharabKar from "@/components/mafia/roles/KharabKar.vue";
import DoctorLekter from "@/components/mafia/roles/DoctorLekter.vue";
import GroganGir from "@/components/mafia/roles/GroganGir.vue";
import Spy from "@/components/mafia/roles/Spy.vue";
import Sharlatan from "@/components/mafia/roles/Sharlatan.vue";
import SimpleMafia from "@/components/mafia/roles/SimpleMafia.vue";
import Dozd from "@/components/mafia/roles/Dozd.vue";
import Doctor from "@/components/mafia/roles/Doctor.vue";
import Detective from "@/components/mafia/roles/Detective.vue";
import Sniper from "@/components/mafia/roles/Sniper.vue";
import Farmande from "@/components/mafia/roles/Farmande.vue";
import Bomber from "@/components/mafia/roles/Bomber.vue";
import Takavar from "@/components/mafia/roles/Takavar.vue";
import Fadayi from "@/components/mafia/roles/Fadayi.vue";
import JanSakht from "@/components/mafia/roles/JanSakht.vue";
import Keshish from "@/components/mafia/roles/Keshish.vue";
import Tofangdar from "@/components/mafia/roles/Tofangdar.vue";
import Ghazi from "@/components/mafia/roles/Ghazi.vue";
import Shahrdar from "@/components/mafia/roles/Shahrdar.vue";
import Framason from "@/components/mafia/roles/Framason.vue";
import Tiler from "@/components/mafia/roles/Tiler.vue";
import RoyinTan from "@/components/mafia/roles/RoyinTan.vue";
import Citizen from "@/components/mafia/roles/Citizen.vue";
import Saghi from "@/components/mafia/roles/Saghi.vue";
import Cowboy from "@/components/mafia/roles/Cowboy.vue";
import KhabGard from "@/components/mafia/roles/KhabGard.vue";
import Ahangar from "@/components/mafia/roles/Ahangar.vue";
import Killer from "@/components/mafia/roles/Killer.vue";
import Joker from "@/components/mafia/roles/Joker.vue";
import Nostradamus from "@/components/mafia/roles/Nostradamus.vue";
import Negahban from "@/components/mafia/roles/Negahban.vue";

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
class godFather extends roles {
	constructor() {
		super()
		this.card.roleName = "گاد فادر"
		this.card.roleComponent = GodFather
		this.card.side = "mafia"
		this.card.negativeInquiry = { default: 100, value: 100 }
		this.card.heart = { default: 0, value: 0 }
	}
}

class strongMan extends roles {
	constructor() {
		super()
		this.card.roleName = "مرد قوی"
		this.card.roleComponent = StrongMan
		this.card.side = "mafia"
		this.card.shot = { default: 1, value: 1 }
		this.card.sameShot = { default: false, value: false }
		this.card.heart = { default: 0, value: 0 }
	}
}

class nato extends roles {
	constructor() {
		super()
		this.card.roleName = "ناتو"
		this.card.roleComponent = Nato
		this.card.side = "mafia",
			this.card.failsCount = { default: 3, value: 3 }
	}
}

class natasha extends roles {
	constructor() {
		super()
		this.card.roleName = "ناتاشا"
		this.card.roleComponent = Natasha
		this.card.side = "mafia"
		this.card.noVote = { default: true, value: true }
		this.card.noKick = { default: false, value: false }
		this.card.alone = { default: true, value: true }
	}
}

class dozd extends roles {
	constructor() {
		super()
		this.card.roleName = "دزد"
		this.card.roleComponent = Dozd
		this.card.side = "mafia"
		this.card.gone = { default: false, value: false }
		this.card.alone = { default: true, value: true }
	}
}

class afsoongar extends roles {
	constructor() {
		super()
		this.card.roleName = "افسونگر"
		this.card.roleComponent = Afsoongar
		this.card.side = "mafia"
		this.card.silent = { default: true, value: true }
		this.card.fastNight = { default: true, value: true }
	}
}

class terrorist extends roles {
	constructor() {
		super()
		this.card.roleName = "تروریست"
		this.card.roleComponent = Terrorist
		this.card.side = "mafia"
		this.card.afterVote = { default: true, value: true }
		this.card.alone = { default: false, value: false }
	}
}

class mashooghe extends roles {
	constructor() {
		super();
		this.card.roleName = "معشوقه"
		this.card.roleComponent = Mashooghe
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
		this.card.roleComponent = Bazjoo
		this.card.side = "mafia"
		this.card.count = { default: 3, value: 3 }
	}
}

class samSaz extends roles {
	constructor() {
		super()
		this.card.roleName = "سم ساز"
		this.card.roleComponent = SamSaz
		this.card.side = "mafia"
		this.card.count = { default: 2, value: 2 }
		this.card.days = { default: 3, value: 3 }
	}
}

class negotiator extends roles {
	constructor() {
		super()
		this.card.roleName = "مذاکره کننده"
		this.card.roleComponent = Negotiator
		this.card.side = "mafia"
		this.card.framason = { default: false, value: false }
	}
}

class kharabKar extends roles {
	constructor() {
		super()
		this.card.roleName = "خرابکار"
		this.card.roleComponent = KharabKar
		this.card.side = "mafia"
		this.card.counts = [
			{ players: 20, defaultPlayers: 20, default: 3, value: 3 },
			{ players: 15, defaultPlayers: 15, default: 2, value: 2 },
			{ players: 1, defaultPlayers: 1, default: 1, value: 1 },
		]
	}
}

class doctorLekter extends roles {
	constructor() {
		super()
		this.card.roleName = "دکتر لکتر"
		this.card.roleComponent = DoctorLekter
		this.card.side = "mafia"
		this.card.self = { default: 100, value: 100 }
	}
}

class groganGir extends roles {
	constructor() {
		super()
		this.card.roleName = "گروگان گیر"
		this.card.roleComponent = GroganGir
		this.card.side = "mafia"
		this.card.alone = { default: true, value: true }
	}
}

class spy extends roles {
	constructor() {
		super()
		this.card.roleName = "جاسوس"
		this.card.roleComponent = Spy
		this.card.side = "mafia"
		this.card.negativeInquiry = { default: 100, value: 100 }
		this.card.exitWithFramason = { default: false, value: false }
	}
}

class sharlatan extends roles {
	constructor() {
		super()
		this.card.roleName = "شارلاتان"
		this.card.roleComponent = Sharlatan
		this.card.side = "mafia"
		this.card.count = { default: 100, value: 100 }
		this.card.self = { default: 1, value: 1 }
	}
}

class simpleMafia1 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 1"
		this.card.roleComponent = SimpleMafia
		this.card.side = "mafia"
	}
}
class simpleMafia2 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 2"
		this.card.roleComponent = SimpleMafia
		this.card.side = "mafia"
	}
}
class simpleMafia3 extends roles {
	constructor() {
		super()
		this.card.roleName = "مافیا ساده 3"
		this.card.roleComponent = SimpleMafia
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
		this.card.roleComponent = Doctor
		this.card.side = "city"
		this.card.counts = [
			{ players: 20, defaultPlayers: 20, default: 3, value: 3 },
			{ players: 15, defaultPlayers: 15, default: 2, value: 2 },
			{ players: 1, defaultPlayers: 1, default: 1, value: 1 },
		]
		this.card.self = { default: 1, value: 1 }
	}
}

class detective extends roles {
	constructor() {
		super()
		this.card.roleName = "کاراگاه"
		this.card.roleComponent = Detective
		this.card.side = "city"
		this.card.count = { default: 100, value: 100 }
	}
}

class sniper extends roles {
	constructor() {
		super()
		this.card.roleName = "اسنایپر"
		this.card.roleComponent = Sniper
		this.card.side = "city"
		this.card.count = { default: 100, value: 100 }
	}
}

class farmande extends roles {
	constructor() {
		super()
		this.card.roleName = "فرمانده"
		this.card.roleComponent = Farmande
		this.card.side = "city"
		this.card.dieOnFail = { default: true, value: true }
	}
}

class bomber extends roles {
	constructor() {
		super()
		this.card.roleName = "بمبر"
		this.card.roleComponent = Bomber
		this.card.side = "city"
		this.card.count = { default: 5, value: 5 }
	}
}

class takavar1 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 1"
		this.card.roleComponent = Takavar
		this.card.side = "city"
		this.card.sniperShot = { default: true, value: true }
	}
}

class takavar2 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 2"
		this.card.roleComponent = Takavar
		this.card.side = "city"
		// this.card.sniperShot = { default: true, value: true }
	}
}

class takavar3 extends roles {
	constructor() {
		super()
		this.card.roleName = "تکاور 3"
		this.card.roleComponent = Takavar
		this.card.side = "city"
		this.card.sniperShot = { default: true, value: true }
	}
}

class saghi extends roles {
	constructor() {
		super()
		this.card.roleName = "ساقی"
		this.card.roleComponent = Saghi
		this.card.side = "city"
	}
}

class fadayi extends roles {
	constructor() {
		super()
		this.card.roleName = "فدایی"
		this.card.roleComponent = Fadayi
		this.card.side = "city"
	}
}

class janSakht extends roles {
	constructor() {
		super()
		this.card.roleName = "جان ساخت"
		this.card.roleComponent = JanSakht
		this.card.side = "city"
		this.card.inquiry = { default: 2, value: 2 }
		this.card.heart = { default: 1, value: 1 }
	}
}
class keshish extends roles {
	constructor() {
		super()
		this.card.roleName = "کشیش"
		this.card.roleComponent = Keshish
		this.card.side = "city"
		this.card.counts = [
			{ players: 20, defaultPlayers: 20, default: 3, value: 3 },
			{ players: 15, defaultPlayers: 15, default: 2, value: 2 },
			{ players: 1, defaultPlayers: 1, default: 1, value: 1 },
		]
	}
}
class tofangdar extends roles {
	constructor() {
		super()
		this.card.roleName = "تفنگدار"
		this.card.roleComponent = Tofangdar
		this.card.side = "city"
		this.card.count = { default: 3, value: 3 }
		this.card.everyNight = { default: 4, value: 4 }
	}
}
class ghazi extends roles {
	constructor() {
		super()
		this.card.roleName = "قاضی"
		this.card.roleComponent = Ghazi
		this.card.side = "city"
	}
}
class shahrdar extends roles {
	constructor() {
		super()
		this.card.roleName = "شهردارد"
		this.card.roleComponent = Shahrdar
		this.card.side = "city"
		this.card.count = { default: 1, value: 1 }
	}
}
class framason extends roles {
	constructor() {
		super()
		this.card.roleName = "فراماسون"
		this.card.roleComponent = Framason
		this.card.side = "city"
	}
}
class tiler extends roles {
	constructor() {
		super()
		this.card.roleName = "تایلر"
		this.card.roleComponent = Tiler
		this.card.side = "city"
	}
}
class royinTan extends roles {
	constructor() {
		super()
		this.card.roleName = "رویین تن"
		this.card.roleComponent = RoyinTan
		this.card.side = "city"
	}
}
class cowboy extends roles {
	constructor() {
		super()
		this.card.roleName = "کابوی"
		this.card.roleComponent = Cowboy
		this.card.side = "city"
	}
}
class khabGard extends roles {
	constructor() {
		super()
		this.card.roleName = "خوابگرد"
		this.card.roleComponent = KhabGard
		this.card.side = "city"
	}
}
class ahangar extends roles {
	constructor() {
		super()
		this.card.roleName = "آهنگر"
		this.card.roleComponent = Ahangar
		this.card.side = "city"
	}
}
class negahban extends roles {
	constructor() {
		super()
		this.card.roleName = "نگهبان"
		this.card.roleComponent = Negahban
		this.card.side = "city"
		this.card.counts = [
			{ players: 30, defaultPlayers: 30, default: 3, value: 3 },
			{ players: 20, defaultPlayers: 20, default: 2, value: 2 },
			{ players: 1, defaultPlayers: 1, default: 1, value: 1 },
		]
	}
}
class citizen1 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 1"
		this.card.roleComponent = Citizen
		this.card.side = "city"
	}
}
class citizen2 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 2"
		this.card.roleComponent = Citizen
		this.card.side = "city"
	}
}
class citizen3 extends roles {
	constructor() {
		super()
		this.card.roleName = "شهر ساده 3"
		this.card.roleComponent = Citizen
		this.card.side = "city"
	}
}
class killer extends roles {
	constructor() {
		super()
		this.card.roleName = "قاتل"
		this.card.roleComponent = Killer
		this.card.side = "independent"
		this.card.justOdd = { default: true, value: true }
		this.card.deepShot = { default: true, value: true }
		this.card.heart = { default: 100, value: 100 }
	}
}
class joker extends roles {
	constructor() {
		super()
		this.card.roleName = "جوکر"
		this.card.roleComponent = Joker
		this.card.side = "independent"
		this.card.count = { default: 4, value: 4 }
		this.card.heart = { default: 100, value: 100 }
	}
}
class nostradamus extends roles {
	constructor() {
		super()
		this.card.roleName = "نوستراداموس"
		this.card.roleComponent = Nostradamus
		this.card.side = "gray"
		this.card.heart = { default: 100, value: 100 }
	}
}

export {
	godFather, strongMan, nato, natasha, dozd, afsoongar, terrorist, mashooghe,
	bazjoo, samSaz, negotiator, kharabKar, doctorLekter, groganGir,
	spy, sharlatan, simpleMafia1, simpleMafia2, simpleMafia3,

	doctor, detective, sniper, farmande, bomber, takavar1, takavar2, takavar3, saghi,
	fadayi, janSakht, keshish, tofangdar, ghazi, shahrdar, framason, tiler,
	cowboy, ahangar, khabGard, royinTan, negahban, citizen1, citizen2, citizen3,

	killer, joker, nostradamus
};