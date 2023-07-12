<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-emerald-600 font-bold">کاراگاه</span> در ساید
    <span class="text-emerald-600 font-bold">شهر</span>
    بازی می‌کند. او شب بیدار می‌شود و استعلام یک نفر را می‌گیرد. استعلام گادفادر
    و جاسوس برای او برعکس است.
  </p>
  <hr class="my-2" />
  <MnrNumber
    placeholder="استعلام"
    title="تعداد استعلام"
    :min="1"
    :max="100"
    v-model="role.acts.detect_mafia.inventory"
  >
  </MnrNumber>
</template>
