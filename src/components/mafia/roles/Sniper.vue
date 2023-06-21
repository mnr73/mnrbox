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
			<Icon icon="fe:target" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">اسنایپر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و به یک نفر شلیک می‌کند اگر آن شخص مافیا باشد از بازی خارج می‌شود. اگر آن شخص شهر باشد
			خود اسنایپر از بازی خارج می‌شود. اگر آن شخص مستقل باشد هر دو در بازی خواهند ماند.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تیر" title="تعداد تیر" :min="1" :max="100" v-model="role.card.count.value">
		</MnrNumber>
	</RoleWrapper>
</template>