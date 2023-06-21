<script setup>

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
			<Icon icon="game-icons:grim-reaper" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-amber-600 font-bold">قاتل</span> در ساید <span class="text-amber-600 font-bold">مستقل</span>
			بازی
			می‌کند. او هر شب توسط گاد بیدار میشود و یک نفر را به قتل میرساند در ضمن دکتر نمیتواند آن شخص را نجات دهد.هدف کیلر در
			بازی حفظ خود تا آخر بازی و حذف همه بازيکنان ميباشد و در اين صورت ميتواند يک نفره برنده کل بازی شود.
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.card.justOdd.value" class="block w-full">فقط شب های ذوج (یک شب در میان)
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.deepShot.value" class="block w-full">شلیک عمیق (غیر قابل نجات دادت توسط
			پزشک)</MnrCheckSlider>
		<MnrNumber placeholder="جان اضافه" title="جان اضافه" :min="0" :max="100" v-model="role.card.heart.value"></MnrNumber>
	</RoleWrapper>
</template>