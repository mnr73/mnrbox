<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<div class="rounded-md overflow-hidden border border-r-4 border-slate-300">
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role?.userName }} <span class="text-slate-400 font-thin">({{
			role?.roleName
		}})</span>
		</div>
		<slot></slot>
	</div>
</template>