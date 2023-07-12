<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-red-600 font-bold">شارلاتان</span> در ساید
    <span class="text-red-600 font-bold">مافیا</span> بازی می‌کند. او یکی از
    اعضای تیم مافیا یا شهروند را انتخاب می‌کند و استعلام آن شخص برای کاراگاه
    برعکس می‌شود.
  </p>
  <hr class="my-2" />
  <MnrNumber
    placeholder="شارلاتانی"
    title="تعداد شارلاتانی"
    :min="0"
    :max="100"
    v-model="role.acts.detect_reverse.inventory"
  >
  </MnrNumber>
  <MnrNumber
    placeholder="شارلاتانی خودش"
    title="شارلاتانی خودش"
    :min="0"
    :max="100"
    v-model="role.acts.detect_reverse.onSelf"
  >
  </MnrNumber>
</template>
