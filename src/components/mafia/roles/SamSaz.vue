<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">سم ساز</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. سم ساز در شب بیدار می‌شود و یک نفر را مسموم می‌کند و آن شخص {{ role.days.value }} روز بعد در هر صورتی
			میمیرد.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تعداد سم" title="تعداد سم" :min="1" :max="100" v-model="role.count.value"></MnrNumber>
		<MnrNumber placeholder="تعداد روز" title="تعداد روز" :min="2" :max="5" v-model="role.days.value"></MnrNumber>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>