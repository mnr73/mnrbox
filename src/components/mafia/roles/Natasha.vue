<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">ناتاشا</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			میکند. ناتاشا هر شب یک نفر را سایلنت می‌کند و شخص در روز بعد نمی‌تواند صحبت کند و همچنین در رای‌گیری نیز شرکت نخواهد
			کرد. ناتاشا میتواند خود و افراد تیم مافیا را نیز سایلنت کند.
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.alone.value" class="block w-full">بیدار شدن مستقل از مافیا</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.noVote.value" class="block w-full">شخص سایلنت شده نمیتواند رای دهد
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.noKick.value" class="block w-full">نمیتوان برای خروج شخص سایلنت شده
			رای‌گیری کرد
		</MnrCheckSlider>
	</template>
	<div class="p-2" v-else>body</div>
</template>