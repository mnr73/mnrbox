<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<p>
		<span class="text-red-600 font-bold">سم ساز</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
		می‌کند. سم ساز در شب بیدار می‌شود و یک نفر را مسموم می‌کند و آن شخص {{ role.options.days }} روز بعد در هر صورتی
		میمیرد.
	</p>
	<hr class="my-2">
	<MnrNumber placeholder="تعداد سم" title="تعداد سم" :min="1" :max="100" v-model="role.options.count"></MnrNumber>
	<MnrNumber placeholder="تعداد روز" title="تعداد روز" :min="2" :max="5" v-model="role.options.days"></MnrNumber>
</template>