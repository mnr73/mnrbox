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
			<Icon icon="game-icons:ak47u" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">تکاور</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و اگر تیر خورده باشد میتواند تیر بزند. اگر تیر از سمت مافیا باشد و تکاور به مافیا شلیک
			کند در بازی می‌ماند در غیر این صورت تکاور خارج خواهد شد.
		</p>
	</RoleWrapper>
</template>