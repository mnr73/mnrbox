<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch, computed, onMounted } from "vue";
import mafia from "@/modules/mafia";
import MnrSelect from "@/components/mnr/MnrSelect.vue";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";

const data = new mafia;
const users = ref();
const roles = ref();
// let selectedUser = ref()

users.value = data.getActiveUsers();
roles.value = data.getPlayers();

users.value = _.map(users.value, (user) => {
	user.seen = false;
	user.open = false;
	return user;
})

onMounted(() => {
	_.forEach(_.filter(roles.value, ['userId', '']), (role) => {
		let selectedUsers = _.map(roles.value, 'userId')
		let freeUsers = _.filter(users.value, (user) => selectedUsers.find((id) => id == user.id) == undefined)
		freeUsers = _.shuffle(freeUsers)
		role.userId = freeUsers[0].id
		role.userName = freeUsers[0].name
	})
	data.updatePlayers(roles.value)
})

const openUser = computed(() => {
	return _.find(users.value, 'open') || null
})

</script>
<template>
	<div class="sm:p-5 p-2">
		<div class="flex justify-between p-2">
			<h2 class="font-bold">تقسیم نقش ها</h2>
		</div>
		<div class="flex flex-wrap gap-2 justify-center">
			<div class="bg-white p-3 w-24 rounded-md border-t-4 flex-grow text-center "
				:class="{ 'opacity-70': user.seen, 'border-sky-500 shadow-md': !user.seen }"
				v-for="user in _.sortBy(users, 'seen')" :key="user.id" @click="user.open = true">
				<div class="text-lg">{{ user.name }}</div>
			</div>
		</div>
		<div v-show="openUser" @click.self="openUser.seen = true; openUser.open = false"
			class="fixed w-full h-screen bg-black bg-opacity-30 top-0 left-0 z-50 flex items-center justify-center">
			<div class="w-11/12 h-2/6 bg-white shadow-lg rounded-md flex flex-col gap-10 items-center justify-center">
				<div class="">{{ openUser?.name }}</div>
				<div class="">{{ _.find(roles, ['userId', openUser?.id])?.roleName }}</div>
				<button class="bg-red-600 text-white p-2 rounded-md" @click="openUser.seen = true; openUser.open = false">
					متوجه شدم
				</button>
			</div>
		</div>
		<Bottom>
			<div class="p-1">
				<router-link to="/mafia/game" class="bg-red-600 text-white rounded-md p-2 w-full block text-center">
					شروع بازی
				</router-link>
			</div>
		</Bottom>
	</div>
</template>
