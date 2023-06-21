<script setup>

import MnrNumber from '@/components/mnr/MnrNumber.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="game-icons:winged-sword" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">نگهبان</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب بیدار می‌شود و از یک یا چند نفر در مقابل گروگانگیر نگهبانی می‌کند. اگر خو گروگانگیر را انتخاب کند
			گروگانگیر در آن شب نمی‌تواند کسی را گروگان بگیرد.
		</p>
		<hr class="my-2">
		<div class="flex items-center gap-2 mt-2" v-for="(item, index) in role.card.counts" :key="index">
			<MnrNumber class="flex-grow" placeholder="بازیکن" :min="0" :max="100" v-model="item.players">
			</MnrNumber>
			<div>بازیکن</div>
			<MnrNumber class="flex-grow" placeholder="تعدا" :min="0" :max="100" v-model="item.value">
			</MnrNumber>
			<div>نگهبانی</div>
		</div>
	</RoleWrapper>
</template>