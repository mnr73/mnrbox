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

function log(data) {
  userList.value = _.map(userList.value, (role, key) => {
    role.dayOrder = key;
    return role;
  });
  console.log(userList.value);
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
        @change="log"
        class="flex flex-col gap-2"
      >
        <template #item="{ element }" v-if="userList.length">
          <div class="bg-slate-50 border rounded-md p-1 flex gap-2">
            <div>
              <Icon
                icon="akar-icons:drag-horizontal"
                class="w-6 h-6 text-slate-400"
              />
            </div>
            <div>{{ element.userName }}</div>
          </div>
        </template>
      </draggable>
      <!-- <draggable v-model="myArray" tag="transition-group" item-key="id">
        <template #item="{ element }">
          <div
            class="bg-slate-50 border rounded-md p-1 flex gap-2"
            v-for="role in users"
            :key="role.class"
          >
            <div>
              <Icon
                icon="akar-icons:drag-horizontal"
                class="w-6 h-6 text-slate-400"
              />
            </div>
            <div>{{ role.userName }}</div>
          </div>
        </template>
      </draggable> -->
    </div>
  </div>
</template>
