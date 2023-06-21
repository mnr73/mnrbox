<script setup>

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
			<Icon icon="game-icons:crystal-ball" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-amber-600 font-bold">نوستراداموس</span> در ساید <span
				class="text-amber-600 font-bold">خاکستری</span>
			بازی
			می‌کند. او ابتدا عضو هیچ تیمی نیست شب اول گاد او را بیدار می‌کند و او استعلام 3 نفر از بازیکنان را میگیرد و گاد
			تعداد
			مافیا در آن 3 نفر را به اون نشان می‌دهد. او تصمیم میگیرد که در ساید شهر بازی کند یا مافیا. اگر از 3 نفر 2 نفر مافیا
			باشند او باید در ساید مافیا بازی کند. او با شلیک شب نمی‌میرد
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="جان اضافه" title="جان اضافه" :min="0" :max="100" v-model="role.card.heart.value"></MnrNumber>
	</RoleWrapper>
</template>