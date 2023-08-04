<script setup>
import { Icon } from "@iconify/vue";
import { useSlots } from "vue";

const slots = useSlots();
const props = defineProps({
  to: String,
  icon: String,
  center: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <component
    :is="props.to && !props.disabled ? 'router-link' : 'button'"
    :to="props.to"
    class="bg-white shadow-md p-3 flex items-center rounded-md gap-3 text-gray-800 hover:bg-slate-100"
    :class="{
      'justify-center': center,
      'opacity-60 cursor-not-allowed': props.disabled,
    }"
    :disabled="props.disabled"
  >
    <span v-if="props.icon"
      ><Icon :icon="props.icon" class="w-7 h-full"
    /></span>
    <span><slot></slot></span>
    <span class="ms-auto text-gray-500" v-if="slots.info"
      ><slot name="info"></slot
    ></span>
  </component>
</template>
