<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">جان سخت</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او یک جان اضافه دارد و با تیر اول نمی‌میرد. همچنین 2 استعلام دارد که در شب از خدا درخواست می‌کند.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="استعلام" title="تعداد استعلام" :min="0" :max="100" v-model="role.inquiry.value">
		</MnrNumber>
		<MnrNumber placeholder="جان اضافه" title="تعداد جان اضافه" :min="0" :max="100" v-model="role.heart.value"
			class="mt-3"></MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>