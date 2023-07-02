<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">شارلاتان</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. او یکی از اعضای تیم مافیا یا شهروند را انتخاب می‌کند و استعلام آن شخص برای کاراگاه برعکس می‌شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="شارلاتانی" title="تعداد شارلاتانی" :min="0" :max="100" v-model="role.count.value">
		</MnrNumber>
		<MnrNumber placeholder="شارلاتانی خودش" title="شارلاتانی خودش" :min="0" :max="100" v-model="role.self.value">
		</MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>