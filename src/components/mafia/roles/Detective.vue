<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">کاراگاه</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و استعلام یک نفر را می‌گیرد. استعلام گادفادر و جاسوس برای او برعکس است.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="استعلام" title="تعداد استعلام" :min="1" :max="100" v-model="role.count.value">
		</MnrNumber>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>