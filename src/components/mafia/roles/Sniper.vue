<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">اسنایپر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و به یک نفر شلیک می‌کند اگر آن شخص مافیا باشد از بازی خارج می‌شود. اگر آن شخص شهر باشد
			خود اسنایپر از بازی خارج می‌شود. اگر آن شخص مستقل باشد هر دو در بازی خواهند ماند.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تیر" title="تعداد تیر" :min="1" :max="100" v-model="role.count.value">
		</MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>