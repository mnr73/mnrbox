<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch, computed, onMounted } from "vue";
import mafia from "@/modules/mafia";
import MnrSelect from "@/components/mnr/MnrSelect.vue";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";

const data = new mafia;
const users = ref();
const roles = ref();
// let selectedUser = ref()

users.value = data.getActiveUsers();
roles.value = data.getPlayers();



</script>
<template>
	<div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2">
		<div class="flex gap-2">
			<div class="bg-slate-800 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0"
				style="min-width: 2rem;">1
			</div>
			<div class="bg-slate-800 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0"
				style="min-width: 2rem;">2
			</div>
			<div class="bg-slate-800 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0"
				style="min-width: 2rem;">3
			</div>
			<div class="bg-slate-800 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0"
				style="min-width: 2rem;">4
			</div>
			<div class="w-1 flex-shrink-0"></div>
		</div>
	</div>
	<div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2">
		<div class="flex gap-2 font-light">
			<div class="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center justify-center flex-shrink-0">
				شب
			</div>
			<div class="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center justify-center flex-shrink-0">
				روز
			</div>
			<div class="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center justify-center flex-shrink-0">
				رای اول
			</div>
			<div class="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center justify-center flex-shrink-0">
				رای دوم
			</div>
			<div class="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center justify-center flex-shrink-0">
				قاضی
			</div>
			<div class="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center justify-center flex-shrink-0">
				شهردار
			</div>
			<div class="w-1 flex-shrink-0"></div>
		</div>
	</div>
	<div class="sm:p-5 p-2">
		<Bottom>
			<div class="p-2 border-t flex h-16 gap-2">
				<button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">موزیک</button>
				<button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">تایمر</button>
				<button class="bg-slate-700 text-white shadow-md p-2 w-6/12 rounded-2xl">مرحله بعد</button>
			</div>
		</Bottom>
	</div>
</template>
