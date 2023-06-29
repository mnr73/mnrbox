<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch, computed } from "vue";
import mafia from "@/modules/mafia";
import MnrSelect from "@/components/mnr/MnrSelect.vue";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";

const data = new mafia;
const users = ref();
const roles = ref();
let selectedUser = ref()

users.value = data.getActiveUsers();
roles.value = data.getPlayers();

const userOptions = computed(() => {
	return _.filter(users.value, (user) => selectedUser.value.find((id) => id == user.id) == undefined)
})

watch(
	() => roles.value,
	(newValue, oldValue) => {
		selectedUser.value = _.map(roles.value, (role) => {
			role.userName = _.find(users.value, ['id', role.userId])?.name || ''
			return role.userId
		})
		data.updatePlayers(roles.value)
	},
	{ deep: true, immediate: true }
)

function resetRoles() {
	_.forEach(roles.value, (role) => {
		role.userName = ''
		role.userId = ''
	})
}
</script>
<template>
	<div class="sm:p-5 p-2">
		<div class="flex justify-between p-2">
			<h2 class="font-bold">تعیین نقش ها</h2>
			<button class="bg-red-300 text-red-800 px-2 rounded-md" @click="resetRoles()">ریست</button>
		</div>
		<div class="bg-white sm:p-5 p-2 rounded-sm border mb-2" v-for="(role, index) in roles" :key="index">
			<div :class="{
				'text-red-600': role.side == 'mafia',
				'text-emerald-600': role.side == 'city',
				'text-amber-600': role.side == 'independent',
				'text-slate-600': role.side == 'gray',
			}" class="text-lg mb-1">{{ role.roleName }}</div>
			<MnrSelect placeholder="تصادفی"
				:options="role.userId ? [...userOptions, { id: role.userId, name: role.userName, active: true }] : userOptions"
				oValue="id" oText="name" v-model="role.userId" dValue="" dText="تصادفی" />
		</div>
		<Bottom>
			<div class="p-1">
				<router-link to="/mafia/start/assign-roles" class="bg-red-600 text-white rounded-md p-2 w-full block text-center">
					تقسیم نقش ها
				</router-link>
			</div>
		</Bottom>
	</div>
</template>
