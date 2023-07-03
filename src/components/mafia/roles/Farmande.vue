<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<p>
		<span class="text-emerald-600 font-bold">فرمانده</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
		بازی
		می‌کند. او شب بیدار می‌شود و تیری که توسط اسنایپر زده شده را تایید یا رد می‌کند.
	</p>
	<hr class="my-2">
	<MnrCheckSlider v-model:checked="role.options.dieOnFail" class="block w-full">در صورت تیر اشتباه فرمانده خواهد مرد
	</MnrCheckSlider>
</template>