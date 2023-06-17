<script setup>

import { defineProps } from 'vue';
import MnrNumber from '../../mnr/MnrNumber.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="fa-solid:theater-masks" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">ناتو</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			میکند. ناتو می‌تواند به جای تیر شب ناتویی کند و اگر درست نقش کسی را حدس بزند آن شخص بی چون و چرا از بازی خارج
			می‌شود.
			اگر ناتو {{ role.card.failsCount.value }} بار اشتباه حدس بزند از بازی خارج می‌شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تعداد حدس اشتباه" title="حدس اشتباه" :min="0" :max="100" v-model="role.card.failsCount.value"
			class="mt-3">
		</MnrNumber>
	</RoleWrapper>
</template>