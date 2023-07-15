<script setup>
import { Icon } from "@iconify/vue";
import { reactive } from "vue";
import endSound from "@/assets/audio/end.ogg";

let time;
let sound = new Audio(endSound);

const props = defineProps({
  time: Number,
});

const timer = reactive({
  paused: false,
  time: props.time,
  remain: props.time,
});

function start() {
  clearInterval(time);
  if (!timer.paused) {
    timer.remain = timer.time;
  }
  timer.paused = false;
  time = setInterval(() => {
    timer.remain -= 1;
    if (timer.remain <= 0) {
      timer.remain = timer.time;
      sound.play();
      clearInterval(time);
    }
  }, 1000);
}

function pause() {
  clearInterval(time);
  timer.paused = true;
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
        @click="start()"
      >
        <Icon icon="akar-icons:play" class="inline-block w-6 h-full" />
      </div>
      <div
        class="border rounded-md bg-white w-full text-center"
        @click="pause()"
      >
        <Icon icon="akar-icons:pause" class="inline-block w-6 h-full" />
      </div>
    </div>
  </div>
</template>
