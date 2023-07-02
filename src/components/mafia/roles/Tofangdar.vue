<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">تفنگ دار</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب میتواند به {{ role.everyNight.value }} نفر از بازیکنان تفنگ واقعی یا مشقی بدهد. اون {{
				role.count.value }} تفنگ واقعی و بی نهایت تفنگ مشقی دارد.
			اگر تفنگ واقعی توسط بازیکن استفاده نشود حساب نمی‌شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="واقعی" title="تعداد تفنگ واقعی" :min="1" :max="100" v-model="role.count.value">
		</MnrNumber>
		<MnrNumber placeholder="تفنگ شب" title="تعداد تفنگ در هر شب" :min="0" :max="100" v-model="role.everyNight.value"
			class="mt-3"></MnrNumber>
	</template>
	<div class="p-2" v-else>body</div>
</template>