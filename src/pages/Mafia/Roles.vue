<script setup>
import { Icon } from "@iconify/vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import * as role from "@/modules/roles";
import { ref, reactive, computed, watch } from "vue";
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
let roles = ref()

setRoles()

function setRoles() {
	roles.value = data.getRoles()
	if (!roles.value) {
		roles.value = _.map(role, (r) => {
			let obj = new r()
			return {
				active: false,
				open: false,
				card: obj.card,
			}
		})
		roles.value = _.orderBy(roles.value, [(x) => x.card.side == 'mafia', (x) => x.card.side == 'city', 'card.side'], ['desc', 'desc']);
	}
}

const filteredRoles = computed(() => _.orderBy(_.filter(roles.value, (x) => !x.card.roleName.search(name.value)), 'active', 'desc'))

users.value = data.getUsers();

watch(
	() => roles.value,
	(newValue, oldValue) => {
		name.value = "";
		data.updateRoles(roles.value)
		data.updatePlayers(_.map(_.filter(roles.value, 'active'), 'card'))
	},
	{ deep: true }
)

function deleteRoles() {
	data.deleteRoles()
	setRoles()
}

function getComponent(component) {
	return {
		GodFather, StrongMan, Nato, Natasha, Afsoongar, Terrorist, Mashooghe, Bazjoo, SamSaz, Negotiator, KharabKar, DoctorLekter, GroganGir, Spy, Sharlatan, SimpleMafia, Dozd, Doctor, Detective, Sniper, Farmande, Bomber, Takavar, Fadayi, JanSakht, Keshish, Tofangdar, Ghazi, Shahrdar, Framason, Tiler, RoyinTan, Citizen, Saghi, Cowboy, KhabGard, Ahangar, Killer, Joker, Nostradamus, Negahban,
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
			<div class="flex justify-between">
				<h2 class="font-bold">
					نقش ها (<span>{{ _.filter(roles, "active").length }}</span> از
					<span>{{ Object.keys(roles).length }}</span>)
					-
					<span class="text-slate-400">بازیکن ها {{ _.filter(users, 'active')?.length || 0 }}</span>
				</h2>
				<button class="bg-red-300 text-red-800 px-2 rounded-md" @click="deleteRoles()">ریست</button>
			</div>
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
			<div class="mt-5 grid grid-cols-1 gap-3" v-else>
				<template v-for="role in filteredRoles" :key="role.card.class">
					<component :is='getComponent(role.card.roleComponent)' :role="role"></component>
				</template>
			</div>
		</div>
	</div>
</template>
