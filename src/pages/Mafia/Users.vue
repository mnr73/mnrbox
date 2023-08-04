<script setup>
import { Icon } from "@iconify/vue";
import mafia from "../../modules/mafia";
import { ref, reactive, computed } from "vue";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import SliderCheckBox from "@/components/SliderCheckBox.vue";
import LightBtn from "@/components/btn/LightBtn.vue";

let data = new mafia();
let name = ref();
let users = ref();

users.value = data.getUsers();

function addUser(n) {
  users.value.push({
    id:
      users.value.length +
      1 +
      "-" +
      (Math.random() + 1).toString(36).substring(5),
    name: n,
    active: true,
  });
  updateUsers(users.value);
  name.value = "";
}

function removeUser(i) {
  users.value = users.value.filter((item, index) => index !== i);
  updateUsers(users.value);
}

function updateUsers() {
  users.value = data.updateUsers(users.value);
}

const filteredUsers = computed(() =>
  _.orderBy(
    _.filter(users.value, (x) => !x.name.search(name.value)),
    "active",
    "desc"
  )
);
</script>
<template>
  <div class="sm:p-5 p-2 max-w-lg mx-auto">
    <form class="flex gap-2 h-14" @submit.prevent="addUser(name)">
      <button class="bg-red-500 aspect-square text-lg text-white rounded-md">
        اضافه
      </button>
      <input
        type="text"
        v-model="name"
        class="shadow-sm w-full border border-red-300 outline-none px-2 rounded-md"
      />
    </form>
    <hr class="my-5" />
    <h2 class="font-bold">
      بازیکنان (<span>{{ _.filter(users, "active").length }}</span> از
      <span>{{ users.length }}</span
      >)
    </h2>
    <div class="mt-5" v-if="users.length == 0">کاربری وجود ندارد</div>
    <transition-group
      name="flip-list"
      tag="div"
      class="mt-5 grid grid-cols-1 gap-3 transition-all duration-1000"
      v-else
    >
      <div
        v-for="(user, index) in filteredUsers"
        :key="user.id"
        class="rounded-md shadow-sm h-10 bg-white flex border-r-4 items-center gap-2 px-2"
        :class="{
          'border-r-red-500': user.active,
        }"
      >
        <div class="h-full flex items-center">
          <SliderCheckBox
            v-model="user.active"
            @change="updateUsers()"
          ></SliderCheckBox>
        </div>
        <div class="flex-grow">{{ user.name }}</div>
        <div
          class="h-full flex items-center cursor-pointer"
          @click="removeUser(index)"
        >
          <Icon icon="octicon:x-circle-fill-16" class="text-red-600" />
        </div>
      </div>
    </transition-group>
    <div class="h-60"></div>
  </div>

  <Bottom>
    <div class="p-1 max-w-lg mx-auto">
      <LightBtn
        to="/mafia"
        class="!bg-red-500 !text-white"
        icon="akar-icons:thumbs-up"
        :center="true"
        >تایید</LightBtn
      >
    </div>
  </Bottom>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
