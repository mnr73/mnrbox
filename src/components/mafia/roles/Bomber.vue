<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">بمبر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و زیر یک نفر بمب قرار می‌دهد و یک اکت به گاد نشان می‌دهد. در صورت انجام آن فکت در روز آن
			شخص منفجر خواهد شد.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="بمب" title="تعداد بمب" :min="1" :max="100" v-model="role.count.value">
		</MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>