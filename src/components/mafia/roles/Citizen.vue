<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">شهر ساده</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او نقشی ندارد فقط در رای‌گیری ها و صحبت ها شکرت می‌کند. اون قابل مذاکره است
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>