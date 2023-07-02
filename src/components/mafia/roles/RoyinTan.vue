<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">رویین تن</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او یار هرگز در شب نمی‌میرد مگر مرد قوی یا سم ساز آن را بکشد. او قابل مذاکره است
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>