<script setup>

import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="game-icons:hand-bandage" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">فدایی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او میتواند خودش را فدای یکی از شهروندان کند. هنگامی که یک نقش مهم دارد به اشتباه با رای‌گیری از شهر خارج
			می‌شود او می‌تواند خودش را فدای آن شخص کند و به جای او از بازی خارج شود.
		</p>
	</RoleWrapper>
</template>