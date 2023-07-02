<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">دزد</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. او مافیا را می‌شناسد ولی مستقل از مافیا بیدار می‌شود و هر شب قابلیت یک نفر را می‌دزدد و از آن روی یک نفر
			استفاده می‌کند. قابلیت هایی که امکان دزدیده شدن نداشته باشند دست نخورده باقی مانده یا از بین می‌روند
		</p>
		<hr class="my-2" />
		<MnrCheckSlider v-model:checked="role.gone.value" class="block w-full">نقش هایی که قابلیت دزدی ندارند غیر فعال
			شوند
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.alone.value" class="block w-full">بیدار شدن مستقل از مافیا
		</MnrCheckSlider>
	</template>
	<div class="p-2" v-else>body</div>
</template>