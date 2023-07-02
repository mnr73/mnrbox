<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">شهردار</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او میتواند نتیجه رای‌گیری را وتو کند و نگذارد شهروند از شهر خارج شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="وتو" title="تعداد وتو" :min="1" :max="100" v-model="role.count.value">
		</MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>