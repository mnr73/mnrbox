<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const props = defineProps({
  item: Object,
  to: Boolean,
});
</script>

<template>
  <div
    class="bg-slate-100 border border-r-4 rounded-md py-1 px-2"
    :class="{
      'border-r-sky-500': to,
      'border-r-red-500': !to,
    }"
  >
    {{ item?.[to ? "target" : "user"]?.userName }}
    <span class="text-slate-400">
      <Icon
        :icon="item?.[to ? 'target' : 'user']?.icon"
        class="inline-block w-6 h-full"
      />
      {{ item?.[to ? "target" : "user"]?.roleName }}
    </span>
    <span class="text-slate-500 font-bold" v-if="item?.word">
      ({{ item?.word }})
    </span>
    <span class="text-slate-500 font-bold" v-if="item?.bombAct">
      ({{ item?.bombAct }})
    </span>
    <span class="text-slate-500 font-bold" v-if="item.guess !== undefined">
      ({{ item?.guess ? "درست" : "غلط" }})
    </span>
    <span class="text-slate-500 font-bold" v-if="item.type == 'rob_from'">
      (دزدیدن)
    </span>
    <span class="text-slate-500 font-bold" v-if="item.type == 'rob_to'">
      (زدن)
    </span>
    <span class="text-emerald-500 font-bold" v-if="item.type == 'true_gun'">
      (واقعی)
    </span>
    <span class="text-red-500 font-bold" v-if="item.type == 'fake_gun'">
      (مشقی)
    </span>
  </div>
</template>
