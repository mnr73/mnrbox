<script setup>
import { Icon } from "@iconify/vue";
import { reactive } from "vue";
import endSound from "@/assets/audio/end.ogg";

// let time;
let sound = new Audio(endSound);

const props = defineProps({
  timer: Object,
});

const emit = defineEmits(["start"]);

// const timer = reactive({
//   paused: false,
//   time: props.time,
//   remain: props.time,
// });

function start() {
  emit("start");
  clearInterval(props.timer.counter);
  if (!props.timer.paused) {
    props.timer.remain = props.timer.time;
  }
  props.timer.paused = false;
  props.timer.remain -= 1;
  props.timer.counter = setInterval(() => {
    props.timer.remain -= 1;
    if (props.timer.remain <= 0) {
      props.timer.remain = props.timer.time;
      sound.play();
      clearInterval(props.timer.counter);
    }
  }, 1000);
}

function pause() {
  if (props.timer.paused) {
    props.timer.remain = props.timer.time;
  } else {
    clearInterval(props.timer.counter);
    props.timer.paused = true;
  }
}
</script>

<template>
  <div class="w-full max-w-sm p-2">
    <div class="flex justify-between" dir="ltr">
      <div class="border rounded-md bg-white">
        <Icon
          icon="akar-icons:minus"
          class="inline-block w-6 h-full"
          @click="timer.time -= 5"
        />
      </div>
      <div class="text-md">
        {{ timer.time }}
        <span class="font-bold text-xl">/ {{ timer.remain }}</span>
      </div>
      <div class="border rounded-md bg-white" @click="timer.time += 5">
        <Icon icon="akar-icons:plus" class="inline-block w-6 h-full" />
      </div>
    </div>
    <div class="bg-slate-700 h-1 rounded-lg overflow-hidden my-1" dir="ltr">
      <div
        class="bg-red-500 h-full w-1/2"
        :style="{ width: 100 - (timer.remain * 100) / timer.time + '%' }"
      ></div>
    </div>
    <div class="flex justify-around gap-2">
      <div
        class="border rounded-md bg-white w-full text-center"
        :class="{
          '!bg-red-500 text-white': timer.remain < timer.time && !timer.paused,
        }"
        @click="start()"
      >
        <Icon icon="akar-icons:play" class="inline-block w-6 h-full" />
        <Icon
          v-show="timer.remain < timer.time && !timer.paused"
          icon="akar-icons:arrow-clockwise"
          class="inline-block w-6 h-full"
        />
      </div>
      <div
        class="border rounded-md bg-white w-full text-center"
        :class="{
          '!bg-red-500 text-white': timer.remain < timer.time && timer.paused,
        }"
        @click="pause()"
      >
        <Icon icon="akar-icons:pause" class="inline-block w-6 h-full" />
        <Icon
          v-show="timer.remain < timer.time && timer.paused"
          icon="akar-icons:arrow-clockwise"
          class="inline-block w-6 h-full"
        />
      </div>
    </div>
  </div>
</template>
