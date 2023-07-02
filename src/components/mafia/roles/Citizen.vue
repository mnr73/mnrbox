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
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>