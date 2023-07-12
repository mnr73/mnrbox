<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-emerald-600 font-bold">بمبر</span> در ساید
    <span class="text-emerald-600 font-bold">شهر</span>
    بازی می‌کند. او شب بیدار می‌شود و زیر یک نفر بمب قرار می‌دهد و یک اکت به گاد
    نشان می‌دهد. در صورت انجام آن فکت در روز آن شخص منفجر خواهد شد.
  </p>
  <hr class="my-2" />
  <MnrNumber
    placeholder="بمب"
    title="تعداد بمب"
    :min="1"
    :max="100"
    v-model="role.acts.bomb.inventory"
  >
  </MnrNumber>
</template>
