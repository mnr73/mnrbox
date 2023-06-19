<script setup>

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
			<Icon icon="game-icons:balaclava" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">دزد</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. او مافیا را می‌شناسد ولی مستقل از مافیا بیدار می‌شود و هر شب قابلیت یک نفر را می‌دزدد و از آن روی یک نفر
			استفاده می‌کند. قابلیت هایی که امکان دزدیده شدن نداشته باشند دست نخورده باقی مانده یا از بین می‌روند
		</p>
		<hr class="my-2" />
		<MnrCheckSlider v-model:checked="role.card.gone.value" class="block w-full">نقش هایی که قابلیت دزدی ندارند غیر فعال
			شوند
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.alone.value" class="block w-full">بیدار شدن مستقل از مافیا
		</MnrCheckSlider>
	</RoleWrapper>
</template>