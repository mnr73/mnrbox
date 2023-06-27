<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import mafia from "@/modules/mafia";

const settings = ref({
	zeroNight: false,
	speakTime: 30,
	giftTime: 20,
});

const data = new mafia;

settings.value = data.getSetting() || settings.value

watch(
	() => settings.value,
	(newValue, oldValue) => {
		data.updateSetting(settings.value)
	},
	{ deep: true }
)
</script>
<template>
	<div class="sm:p-5 p-2">
		<div class="bg-white sm:p-5 p-2 rounded-sm border">
			<MnrCheckSlider v-model:checked="settings.zeroNight">شب قبل از معارفه. در بعضی از بازی ها مافیا قبل از روز معارفه
				بیدار شده و یک دیگر را می‌شناسند.
			</MnrCheckSlider>
			<hr class="my-2">
			<MnrNumber title="زمان صحبت" v-model="settings.speakTime" />
			<MnrNumber title="زمان چالش" v-model="settings.giftTime" class="mt-3" />
		</div>
	</div>
</template>
