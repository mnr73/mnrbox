<script setup>

import { defineProps } from 'vue';
import MnrNumber from '../../mnr/MnrNumber.vue';
import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="game-icons:cowled" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">ناتاشا</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			میکند. ناتاشا هر شب یک نفر را سایلنت می‌کند و شخص در روز بعد نمی‌تواند صحبت کند و همچنین در رای‌گیری نیز شرکت نخواهد
			کرد. ناتاشا میتواند خود و افراد تیم مافیا را نیز سایلنت کند.
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.card.alone.value" class="block w-full">بیدار شدن مستقل از مافیا</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.noVote.value" class="block w-full">شخص سایلنت شده نمیتواند رای دهد
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.noKick.value" class="block w-full">نمیتوان برای خروج شخص سایلنت شده
			رای‌گیری کرد
		</MnrCheckSlider>
	</RoleWrapper>
</template>