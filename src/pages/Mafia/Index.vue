<script setup>
import { Icon } from "@iconify/vue";
import mafia from "../../modules/mafia";
import { ref, reactive } from "vue";
import _ from "lodash";

let data = new mafia();
let users = ref();

users.value = data.getUsers();
</script>
<template>
	<div class="grid sm:grid-cols-3 grid-cols-1 sm:mt-20 text-center gap-5 p-5">
		<div>
			<router-link to="/mafia/users" class="sm:w-60 max-w-full block mx-auto bg-gray-100 rounded-2xl shadow-md">
				<div class="w-full rounded-2xl p-5 bg-red-500 text-white">بازیکنان (<span>{{ _.filter(users, 'active')?.length ||
					0 }}</span>)</div>
			</router-link>
		</div>
		<div>
			<router-link to="/mafia/roles" class="sm:w-60 max-w-full block mx-auto bg-gray-100 rounded-2xl shadow-md">
				<div class="w-full rounded-2xl p-5 bg-red-500 text-white">نقش ها</div>
			</router-link>
		</div>
		<div>
			<router-link to="/mafia/setting" class="sm:w-60 max-w-full block mx-auto bg-gray-100 rounded-2xl shadow-md">
				<div class="w-full rounded-2xl p-5 bg-red-500 text-white">تنظیمات</div>
			</router-link>
		</div>
	</div>
	<div class="mt-20">
		<router-link to="/mafia/users"
			class="bg-red-500 mx-auto w-32 h-32 flex items-center justify-center text-white rounded-full shadow-lg">شروع</router-link>
	</div>
</template>
