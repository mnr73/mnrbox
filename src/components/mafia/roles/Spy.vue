<script setup>

import { defineProps } from 'vue';
import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';
import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="game-icons:spy" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">جاسوس</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. اگر جاسوس عضو تیم فراماسون شود تیم فراماسون از بازی خارج نمی‌شوند و بازی ادامه دارد. استعلام جاسوس برای
			کاراگاه منفی است و همچنین در استعلام ها جزو تیم شهر حساب می‌شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="استعلام منفی" title="تعداد استعلام منفی" :min="0" :max="100"
			v-model="role.card.negativeInquiry.value"></MnrNumber>
		<MnrCheckSlider v-model:checked="role.card.exitWithFramason.value" class="block w-full">خارج شدن با اعضای ماسونی
		</MnrCheckSlider>
	</RoleWrapper>
</template>