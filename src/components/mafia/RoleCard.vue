<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<div class="rounded-md border border-r-4 border-slate-300">
		<div class="p-2 bg-slate-100 font-bold border-b rounded-t-md">{{ role?.userName }} <span
				class="text-slate-400 font-thin">
				<Icon :icon="role.icon" class="inline-block mx-1 h-full w-6" />{{
					role?.roleName
				}}
			</span>
		</div>
		<slot></slot>
	</div>
</template>