<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">تایلر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او یار ماسون است و از شب اول با اوت چشم باز می‌کند. اگر ماسون بمیرد یا خارج شود تایلر جای آن را خواهد گرفت.
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>