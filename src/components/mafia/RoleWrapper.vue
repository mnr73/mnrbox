<script setup>

import { defineProps } from 'vue';
import { Icon } from "@iconify/vue";

defineProps({
	role: Object
})
</script>

<template>
	<div class="border rounded-md bg-gray-50 border-r-4 items-center" :class="{
		'border-r-sky-400': role.active,
		'border-r-slate-500': !role.active,
	}">
		<div class="flex items-center h-10">
			<label class="px-2 h-full flex items-center cursor-pointer">
				<input type="checkbox" v-model="role.active" @change="updateRoles()" class="cursor-pointer" />
			</label>
			<div class="flex items-center flex-grow cursor-pointer hover:bg-gray-100 h-full" @click="role.open = !role.open">
				<div class="flex-grow px-2 font-bold"
					:class="{ 'text-red-600': role.card.side == 'mafia', 'text-emerald-600': role.card.side == 'city' }">
					<slot name="icon"></slot> {{ role.card.roleName }}
				</div>
				<div class="h-full flex items-center">
					<Icon icon="octicon:triangle-down-24" class="text-slate-600 h-full w-8 transition"
						:class="{ 'rotate-180': role.open }" />
				</div>
			</div>
		</div>
		<div class="transition p-2 bg-white" v-show="role.open">
			<div class="leading-relaxed mt-2">
				<slot></slot>
			</div>
		</div>
	</div>
</template>