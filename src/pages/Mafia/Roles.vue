<script setup>
import { Icon } from "@iconify/vue";
import mafia from "../../modules/mafia";
import { godFather } from "../../modules/roles";
import { ref, reactive } from "vue";
import _ from "lodash";
import GodFather from "../../components/mafia/roles/GodFather.vue"

let data = new mafia();
let name = ref();
let users = ref();
let roles = reactive({
	godFather: {
		active: false,
		open: false,
		role: new godFather(),
	},
});

// roles.godFather.targets()
// roles.godFather.targetBy()
// console.log(roles.godFather.status);

users.value = data.getUsers();

function updateRoles() {
	// users.value = data.updateUsers(users.value);
}

function getComponent(component) {
	return { GodFather }[component]
}
</script>
<template>
	<div class="p-5">
		<input placeholder="جستجو" type="text" v-model="name"
			class="shadow-sm w-full border border-red-300 outline-none px-2 rounded-md h-14" />
		<hr class="my-4" />
		<div class="bg-white p-5 border rounded-sm">
			<h2 class="font-bold">
				نقش ها (<span>{{ _.filter(roles, "active").length }}</span> از
				<span>{{ Object.keys(roles).length }}</span>)
				-
				<span class="text-slate-400">بازیکن ها {{ _.filter(users, 'active')?.length || 0 }}</span>
			</h2>
			<div class="mt-5" v-if="Object.keys(roles).length == 0">
				کاربری وجود ندارد
			</div>
			<div class="mt-5 grid grid-cols-1 gap-2" v-else>
				<div v-for="(role, key) in roles" :key="key" class="border rounded-md bg-gray-50 border-r-4 items-center" :class="{
					'border-r-red-500': role.active,
				}">
					<div class="flex items-center h-10">
						<label class="block px-2 h-full flex items-center cursor-pointer">
							<input type="checkbox" v-model="role.active" @change="updateRoles()" class="cursor-pointer" />
						</label>
						<div class="flex items-center flex-grow cursor-pointer hover:bg-gray-100 h-full"
							@click="role.open = !role.open">
							<div class="flex-grow px-2 font-bold">{{ role.role.roleName }}</div>
							<div class="h-full flex items-center">
								<Icon icon="octicon:triangle-down-24" class="text-slate-600 h-full w-8 transition"
									:class="{ 'rotate-180': role.open }" />
							</div>
						</div>
					</div>
					<div class="transition p-2 bg-white" v-show="role.open">توضیح نقش:
					<div class="leading-relaxed mt-2">
						<component :is='getComponent(role.role.roleComponent)'></component>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
