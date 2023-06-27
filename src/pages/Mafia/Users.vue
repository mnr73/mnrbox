<script setup>
import { Icon } from "@iconify/vue";
import mafia from "../../modules/mafia";
import { ref, reactive, computed } from "vue";
import _ from "lodash";

let data = new mafia();
let name = ref();
let users = ref();

users.value = data.getUsers();

function addUser(n) {
	users.value.push({
		id: users.value.length + 1 + '-' + (Math.random() + 1).toString(36).substring(5),
		name: n,
		active: true,
	});
	updateUsers(users.value);
	name.value = "";
}

function removeUser(i) {
	users.value = users.value.filter((item, index) => index !== i)
	updateUsers(users.value);
}

function updateUsers() {
	users.value = data.updateUsers(users.value);
}

const filteredUsers = computed(() => _.orderBy(_.filter(users.value, (x) => !x.name.search(name.value)), 'active', 'desc'))
</script>
<template>
	<div class="sm:p-5 p-2">
		<form class="flex gap-2 h-14" @submit.prevent="addUser(name)">
			<button class="bg-red-500 aspect-square text-lg text-white rounded-md">
				اضافه
			</button>
			<input type="text" v-model="name" class="shadow-sm w-full border border-red-300 outline-none px-2 rounded-md" />
		</form>
		<hr class="my-4" />
		<div class="bg-white sm:p-5 p-2 border rounded-sm">
			<h2 class="font-bold">بازیکنان (<span>{{ _.filter(users, 'active').length }}</span> از
				<span>{{ users.length }}</span>)
			</h2>
			<div class="mt-5" v-if="users.length == 0">کاربری وجود ندارد</div>
			<div class="mt-5 grid grid-cols-1 gap-2" v-else>
				<div v-for="(user, index) in filteredUsers" :key="user.id"
					class="border rounded-md h-10 bg-gray-50 flex border-r-4 items-center" :class="{
						'opacity-70': !user.active,
						'border-r-red-500': user.active,
					}">
					<label class="block px-2 h-full flex items-center cursor-pointer">
						<input type="checkbox" v-model="user.active" @change="updateUsers()" class="cursor-pointer" />
					</label>
					<div class="flex-grow px-2">{{ user.name }}</div>
					<div class="px-2 h-full flex items-center cursor-pointer" @click="removeUser(index)">
						<Icon icon="octicon:x-circle-fill-16" class="text-red-600" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
