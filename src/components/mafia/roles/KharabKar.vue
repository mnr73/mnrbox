<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-red-600 font-bold">خرابکار</span> در ساید
    <span class="text-red-600 font-bold">مافیا</span> بازی می‌کند. خرابکار در شب
    بیدار می‌شود و یک یا تعدادی از اشخاص را به گاد نشان می‌دهد. اگر آن اشخاص از
    تفنگدار تفنگ دریافت کرده باشند، تفنگ آنها خراب شده و به سمت خود شلیک می‌کند.
  </p>
  <hr class="my-2" />
  <div
    class="flex items-center gap-2 mt-2"
    v-for="(item, index) in role.acts.sabotage.targets"
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
    <div>خرابکاری</div>
  </div>
</template>
