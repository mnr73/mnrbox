<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import _ from "lodash";
import draggable from "vuedraggable";
import Modal from "../Modal.vue";

const emit = defineEmits(["close"]);
const userList = ref({});
const dragging = ref(null);
const newIndex = ref(-1);

function close() {
  emit("close");
}

const props = defineProps({
  game: Object,
});

userList.value = _.filter(props.game.selectedRound?.roles, (role) => {
  return role.dead == false && role.getOut == false;
});
userList.value = _.orderBy(userList.value, "dayOrder", "asc");

function changeList() {
  userList.value = _.map(userList.value, (role, key) => {
    role.dayOrder = key;
    return role;
  });
}

function shiftList(index) {
  // let list = userList.value;
  // let sliced = _.take(list, index);
  let sliced = _.remove(userList.value, function (n, i) {
    return i < index;
  });
  userList.value = [...userList.value, ...sliced];
  // userList.value.push(sliced);
  changeList();
}

function dragEnd(item) {
  dragging.value = -1;
  newIndex.value = item.newIndex;
  // input.item.classList.add("animate-bg-color");
}

function dragStart(item) {
  dragging.value = item.oldIndex;
  // newIndex.value = item.newIndex;
  // input.item.classList.add("animate-bg-color");
}
</script>

<template>
  <Modal @close="close()">
    <div class="p-2">
      <div class="mb-5">
        <p>
          در این صفحه می‌توانید کاربران را به ترتیب نشستن مرتب کنید تا مدیریت
          بازی هنگام رای گیری ساده تر شود.
        </p>
      </div>
      <draggable
        v-if="userList.length"
        v-model="userList"
        item-key="class"
        @change="changeList"
        class="flex flex-col gap-1"
        handle=".handle"
        @end="dragEnd"
        @choose="dragStart"
      >
        <template #item="{ element, index }" v-if="userList.length">
          <div
            class="bg-slate-50 border rounded-md flex gap-2 h-7 items-center"
            :class="{
              '!bg-sky-300': dragging === index,
              'animate-bg-color': newIndex == index,
            }"
          >
            <div class="p-1 handle cursor-move">
              <Icon
                icon="akar-icons:drag-horizontal"
                class="w-10 h-6 text-slate-400"
              />
            </div>
            <div class="p-1">{{ index }}</div>
            <div class="p-1">{{ element.userName }}</div>
            <div
              class="ms-auto h-full w-10 flex items-center justify-center rounded-e-md bg-slate-500 text-white cursor-pointer"
              :class="{ '!bg-sky-500': element == _.first(userList) }"
              @click="shiftList(index)"
            >
              <Icon icon="akar-icons:align-to-top" class="w-5 h-6" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </Modal>
</template>
<style scss scoped>
@keyframes bg-color-animate {
  0% {
    @apply bg-sky-300;
  }
  100% {
    @apply bg-slate-50;
  }
}

.animate-bg-color {
  animation-name: bg-color-animate;
  animation-duration: 1s;
}
</style>
