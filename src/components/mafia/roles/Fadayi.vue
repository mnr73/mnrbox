<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">فدایی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او میتواند خودش را فدای یکی از شهروندان کند. هنگامی که یک نقش مهم دارد به اشتباه با رای‌گیری از شهر خارج
			می‌شود او می‌تواند خودش را فدای آن شخص کند و به جای او از بازی خارج شود.
		</p>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>