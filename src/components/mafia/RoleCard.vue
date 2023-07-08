<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  role: Object,
  step: Object,
});
</script>

<template>
  <div class="rounded-md border border-r-4 border-slate-300">
    <div
      class="p-2 bg-slate-100 font-bold border-b rounded-t-md flex justify-between"
      v-if="props.step?.type == 'night'"
    >
      <div
        :class="{
          'text-red-600': props.role.side == 'mafia',
          'text-emerald-600': props.role.side == 'city',
          'text-amber-600': props.role.side == 'independent',
          'text-slate-600': props.role.side == 'gray',
        }"
      >
        <Icon :icon="props.role.icon" class="inline-block mx-1 h-full w-6" />
        {{ props.role?.roleName }}
      </div>
      <div class="text-slate-400 font-thin">
        {{ props.role?.userName }}
      </div>
    </div>
    <div
      class="p-2 bg-slate-100 font-bold border-b rounded-t-md flex justify-between"
      v-else
    >
      <div>
        {{ props.role?.userName }}
      </div>
      <div class="text-slate-400 font-thin">
        <Icon :icon="props.role.icon" class="inline-block mx-1 h-full w-6" />
        {{ props.role?.roleName }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>
