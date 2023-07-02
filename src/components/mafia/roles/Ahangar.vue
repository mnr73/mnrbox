<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">آهنگر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب به یک نفر یک زره می‌دهد و آن شخص در طول روز به هر نحوی که بخواهد از بازی خارج شود نمی‌شود و فقط زره
			آن می‌افتد
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>