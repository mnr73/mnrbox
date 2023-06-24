<script setup>
import { Icon } from "@iconify/vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import {
	godFather, strongMan, nato, natasha, dozd, afsoongar, terrorist, mashooghe,
	bazjoo, samSaz, negotiator, kharabKar, doctorLekter, groganGir,
	spy, sharlatan, simpleMafia1, simpleMafia2, simpleMafia3,

	doctor, detective, sniper, farmande, bomber, takavar1, takavar2, takavar3, saghi,
	fadayi, janSakht, keshish, tofangdar, ghazi, shahrdar, framason, tiler,
	cowboy, ahangar, khabGard, royinTan, negahban, citizen1, citizen2, citizen3,

	killer, joker, nostradamus
} from "@/modules/roles";
import { ref, reactive, computed } from "vue";
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

let data = new mafia();
let name = ref();
let users = ref();
let roles = reactive({
	godFather: {
		active: false,
		open: false,
		card: new godFather().card,
	},
	strongMan: {
		active: false,
		open: false,
		card: new strongMan().card,
	},
	nato: {
		active: false,
		open: false,
		card: new nato().card,
	},
	natasha: {
		active: false,
		open: false,
		card: new natasha().card,
	},
	dozd: {
		active: false,
		open: false,
		card: new dozd().card,
	},
	afsoongar: {
		active: false,
		open: false,
		card: new afsoongar().card,
	},
	terrorist: {
		active: false,
		open: false,
		card: new terrorist().card,
	},
	mashooghe: {
		active: false,
		open: false,
		card: new mashooghe().card,
	},
	bazjoo: {
		active: false,
		open: false,
		card: new bazjoo().card,
	},
	samSaz: {
		active: false,
		open: false,
		card: new samSaz().card,
	},
	negotiator: {
		active: false,
		open: false,
		card: new negotiator().card,
	},
	kharabKar: {
		active: false,
		open: false,
		card: new kharabKar().card,
	},
	doctorLekter: {
		active: false,
		open: false,
		card: new doctorLekter().card,
	},
	groganGir: {
		active: false,
		open: false,
		card: new groganGir().card,
	},
	spy: {
		active: false,
		open: false,
		card: new spy().card,
	},
	sharlatan: {
		active: false,
		open: false,
		card: new sharlatan().card,
	},
	simpleMafia1: {
		active: false,
		open: false,
		card: new simpleMafia1().card,
	},
	simpleMafia2: {
		active: false,
		open: false,
		card: new simpleMafia2().card,
	},
	simpleMafia3: {
		active: false,
		open: false,
		card: new simpleMafia3().card,
	},
	doctor: {
		active: false,
		open: false,
		card: new doctor().card,
	},
	detective: {
		active: false,
		open: false,
		card: new detective().card,
	},
	sniper: {
		active: false,
		open: false,
		card: new sniper().card,
	},
	farmande: {
		active: false,
		open: false,
		card: new farmande().card,
	},
	bomber: {
		active: false,
		open: false,
		card: new bomber().card,
	},
	takavar1: {
		active: false,
		open: false,
		card: new takavar1().card,
	},
	takavar2: {
		active: false,
		open: false,
		card: new takavar2().card,
	},
	takavar3: {
		active: false,
		open: false,
		card: new takavar3().card,
	},
	saghi: {
		active: false,
		open: false,
		card: new saghi().card,
	},
	fadayi: {
		active: false,
		open: false,
		card: new fadayi().card,
	},
	janSakht: {
		active: false,
		open: false,
		card: new janSakht().card,
	},
	keshish: {
		active: false,
		open: false,
		card: new keshish().card,
	},
	tofangdar: {
		active: false,
		open: false,
		card: new tofangdar().card,
	},
	ghazi: {
		active: false,
		open: false,
		card: new ghazi().card,
	},
	shahrdar: {
		active: false,
		open: false,
		card: new shahrdar().card,
	},
	framason: {
		active: false,
		open: false,
		card: new framason().card,
	},
	tiler: {
		active: false,
		open: false,
		card: new tiler().card,
	},
	royinTan: {
		active: false,
		open: false,
		card: new royinTan().card,
	},
	cowboy: {
		active: false,
		open: false,
		card: new cowboy().card,
	},
	KhabGard: {
		active: false,
		open: false,
		card: new khabGard().card,
	},
	ahangar: {
		active: false,
		open: false,
		card: new ahangar().card,
	},
	negahban: {
		active: false,
		open: false,
		card: new negahban().card,
	},
	citizen1: {
		active: false,
		open: false,
		card: new citizen1().card,
	},
	citizen2: {
		active: false,
		open: false,
		card: new citizen2().card,
	},
	citizen3: {
		active: false,
		open: false,
		card: new citizen3().card,
	},
	killer: {
		active: false,
		open: false,
		card: new killer().card,
	},
	joker: {
		active: false,
		open: false,
		card: new joker().card,
	},
	nostradamus: {
		active: false,
		open: false,
		card: new nostradamus().card,
	},
});

const filteredRoles = computed(() => _.orderBy(_.filter(roles, (x) => !x.card.roleName.search(name.value)), 'active', 'desc'))

users.value = data.getUsers();

function updateRoles() {
	console.log('updateRoles');
	name.value = "";
	// users.value = data.updateUsers(users.value);
}

function getComponent(component) {
	return {
		GodFather,
		StrongMan,
		Nato,
		Natasha,
		Afsoongar,
		Terrorist,
		Mashooghe,
		Bazjoo,
		SamSaz,
		Negotiator,
		KharabKar,
		DoctorLekter,
		GroganGir,
		Spy,
		Sharlatan,
		SimpleMafia,
		Dozd,
		Doctor,
		Detective,
		Sniper,
		Farmande,
		Bomber,
		Takavar,
		Fadayi,
		JanSakht,
		Keshish,
		Tofangdar,
		Ghazi,
		Shahrdar,
		Framason,
		Tiler,
		RoyinTan,
		Citizen,
		Saghi,
		Cowboy,
		KhabGard,
		Ahangar,
		Killer,
		Joker,
		Nostradamus,
		Negahban,
	}[component]
	// return eval(component)
}
</script>
<template>
	<div class="sm:p-5 p-2">
		<input placeholder="جستجو" type="text" v-model="name"
			class="shadow-sm w-full border border-red-300 outline-none px-2 rounded-md h-14" />
		<hr class="my-4" />
		<div class="bg-white sm:p-5 p-2 border rounded-sm">
			<h2 class="font-bold">
				نقش ها (<span>{{ _.filter(roles, "active").length }}</span> از
				<span>{{ Object.keys(roles).length }}</span>)
				-
				<span class="text-slate-400">بازیکن ها {{ _.filter(users, 'active')?.length || 0 }}</span>
			</h2>
			<div class="grid grid-cols-4 gap-2 mt-2">
				<div class="bg-red-500 p-2 rounded-md text-white text-center">
					{{ _.filter(roles, {
						'card': { 'side': 'mafia' }, 'active': true
					}).length }} از {{ _.filter(roles, ["card.side", 'mafia']).length }}
				</div>
				<div class="bg-emerald-500 p-2 rounded-md text-white text-center">
					{{ _.filter(roles, {
						'card': { 'side': 'city' }, 'active': true
					}).length }} از {{ _.filter(roles, ["card.side", 'city']).length }}
				</div>
				<div class="bg-amber-500 p-2 rounded-md text-white text-center">
					{{ _.filter(roles, {
						'card': { 'side': 'independent' }, 'active': true
					}).length }} از {{ _.filter(roles, ["card.side", 'independent']).length }}
				</div>
				<div class="bg-slate-500 p-2 rounded-md text-white text-center">
					{{ _.filter(roles, {
						'card': { 'side': 'gray' }, 'active': true
					}).length }} از {{ _.filter(roles, ["card.side", 'gray']).length }}
				</div>
			</div>
			<div class="mt-5" v-if="Object.keys(roles).length == 0">
				کاربری وجود ندارد
			</div>
			<div class="mt-5 grid grid-cols-1 gap-3" @change="updateRoles()" v-else>
				<template v-for="role in filteredRoles" :key="role.card.class">
					<component :is='getComponent(role.card.roleComponent)' :role="role"></component>
				</template>
			</div>
		</div>
	</div>
</template>
