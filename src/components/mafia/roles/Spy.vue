<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">جاسوس</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. اگر جاسوس عضو تیم فراماسون شود تیم فراماسون از بازی خارج نمی‌شوند و بازی ادامه دارد. استعلام جاسوس برای
			کاراگاه منفی است و همچنین در استعلام ها جزو تیم شهر حساب می‌شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="استعلام منفی" title="تعداد استعلام منفی" :min="0" :max="100"
			v-model="role.negativeInquiry.value"></MnrNumber>
		<MnrCheckSlider v-model:checked="role.exitWithFramason.value" class="block w-full">خارج شدن با اعضای ماسونی
		</MnrCheckSlider>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>