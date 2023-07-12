<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-emerald-600 font-bold">دکتر</span> در ساید
    <span class="text-emerald-600 font-bold">شهر</span>
    بازی می‌کند. او شب بیدار می‌شود و یک یا چند نفر را انتخاب می‌کند. اگر آن شخص
    در شب تیر بخورد کشته نمی‌شود.
  </p>
  <hr class="my-2" />
  <div
    class="flex items-center gap-2 mt-2"
    v-for="(item, index) in role.acts.save_city.targets"
    :key="index"
  >
    <MnrNumber
      class="flex-grow"
      placeholder="بازیکن"
      :min="0"
      :max="100"
      v-model="item.players"
    >
    </MnrNumber>
    <div>بازیکن</div>
    <MnrNumber
      class="flex-grow"
      placeholder="تعدا"
      :min="0"
      :max="100"
      v-model="item.value"
    >
    </MnrNumber>
    <div>نجات</div>
  </div>
  <MnrNumber
    placeholder="نجات خود"
    title="نجات خود"
    :min="1"
    :max="100"
    v-model="role.acts.save_city.onSelf"
  ></MnrNumber>
</template>
