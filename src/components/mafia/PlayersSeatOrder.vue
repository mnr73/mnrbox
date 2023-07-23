<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import _ from "lodash";
import draggable from "vuedraggable";

const emit = defineEmits(["close"]);
const userList = ref({});

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
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20"
    @click.self="close()"
  >
    <div
      class="bg-white rounded-md w-full h-full max-w-xl max-h-fit mx-auto shadow-lg border overflow-y-auto p-2"
    >
      <div class="mb-5">
        <p>
          در این صفحه می‌توانید کاربران را به ترتیب نشستن مرتب کنید تا مدیریت
          بازی هنگام رای گیری ساده تر شود.
        </p>
        <!-- {{ userList }} -->
      </div>
      <draggable
        v-if="userList.length"
        v-model="userList"
        item-key="class"
        @change="changeList"
        class="flex flex-col gap-2"
      >
        <template #item="{ element, index }" v-if="userList.length">
          <div
            class="bg-slate-50 border rounded-md flex gap-2 h-8 items-center"
          >
            <div class="p-1">
              <Icon
                icon="akar-icons:drag-horizontal"
                class="w-6 h-6 text-slate-400"
              />
            </div>
            <div class="p-1">{{ index }}</div>
            <div class="p-1">{{ element.userName }}</div>
            <div
              class="ms-auto h-full w-10 flex items-center justify-center rounded-e-md bg-slate-500 text-white cursor-pointer"
              :class="{ 'bg-sky-500': element == _.first(userList) }"
              @click="shiftList(index)"
            >
              <Icon icon="akar-icons:align-to-top" class="w-5 h-6" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
