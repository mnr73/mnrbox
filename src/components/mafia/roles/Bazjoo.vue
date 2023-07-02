<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">بازجو</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. بازجو هرشب بیدار می‌شود و یک نفر را به گاد نشان می‌دهد. گاد نقش آن شخص و کاری که در آن شب کرده را به بازجو
			می‌گوید.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تعداد بازجویی" title="تعداد بازجویی" :min="0" :max="100" v-model="role.count.value">
		</MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>