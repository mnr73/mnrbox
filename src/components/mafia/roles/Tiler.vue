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
			<Icon icon="game-icons:ram-profile" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">تایلر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او یار ماسون است و از شب اول با اوت چشم باز می‌کند. اگر ماسون بمیرد یا خارج شود تایلر جای آن را خواهد گرفت.
		</p>
	</RoleWrapper>
</template>