<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<p>
		<span class="text-red-600 font-bold">جاسوس</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
		می‌کند. اگر جاسوس عضو تیم فراماسون شود تیم فراماسون از بازی خارج نمی‌شوند و بازی ادامه دارد. استعلام جاسوس برای
		کاراگاه منفی است و همچنین در استعلام ها جزو تیم شهر حساب می‌شود.
	</p>
	<hr class="my-2">
	<MnrCheckSlider v-model:checked="role.options.exitWithFramason" class="block w-full">خارج شدن با اعضای ماسونی
	</MnrCheckSlider>
</template>