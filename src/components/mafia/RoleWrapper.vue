<script setup>

import { Icon } from "@iconify/vue";

const props = defineProps({
	role: Object
})

</script>

<template>
	<div class="border rounded-md bg-gray-50 border-r-4 items-center" :class="{
		'border-r-sky-400': props.role.active,
		'border-r-slate-500': !props.role.active,
	}">
		<div class="flex items-center h-10">
			<label class="px-2 h-full flex items-center cursor-pointer">
				<input type="checkbox" v-model="props.role.active" class="cursor-pointer" />
			</label>
			<div class="flex items-center flex-grow cursor-pointer hover:bg-gray-100 h-full"
				@click="props.role.open = !props.role.open">
				<div class="flex-grow px-2 font-bold" :class="{
					'text-red-600': props.role.card.side == 'mafia',
					'text-emerald-600': props.role.card.side == 'city',
					'text-amber-600': props.role.card.side == 'independent',
					'text-slate-600': props.role.card.side == 'gray',
				}">
					<Icon :icon="props.role.card.icon" class="inline-block w-7 h-full" /> {{ props.role.card.roleName }}
				</div>
				<div class="h-full flex items-center">
					<Icon icon="octicon:triangle-down-24" class="text-slate-600 h-full w-8 transition"
						:class="{ 'rotate-180': props.role.open }" />
				</div>
			</div>
		</div>
		<div class="transition p-2 bg-white" v-show="props.role.open">
			<div class="leading-relaxed mt-2">
				<slot></slot>
			</div>
		</div>
	</div>
</template>