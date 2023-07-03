<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<p>
		<span class="text-red-600 font-bold">تروریست</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
		می‌کند. در بعضی از سناریو ها تروریست مستقل از مافیا بیدار می‌شود و مافیا را نمیشناسد و در بعضی از سناریو ها با مافیا
		بیدار می‌شود. همچنین در بعضی از سناریو ها در طول روز یک نفر را با گفتن کلمه تروریست از بازی خارج می‌کند و در بعضی
		سناریوهای دیگر پس از رای گیری یک نفر را با خود می‌برد.
	</p>
	<hr class="my-2">
	<MnrCheckSlider v-model:checked="role.options.afterVote" class="block w-full">بعد از رای گیری و خارج شدن
	</MnrCheckSlider>
	<MnrCheckSlider v-model:checked="role.options.alone" class="block w-full">بیدار شدن مستقل از مافیا</MnrCheckSlider>
</template>