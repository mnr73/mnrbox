<script setup>
import mafia from "../../modules/mafia";
import { ref, reactive } from "vue";
import _ from "lodash";
import LightBtn from "@/components/btn/LightBtn.vue";
import Modal from "@/components/Modal.vue";

let data = new mafia();
let users = ref();
let players = ref();

users.value = data.getUsers();
players.value = data.getPlayers();
</script>
<template>
  <div
    class="grid grid-cols-1 w-full max-w-sm mx-auto sm:mt-20 gap-5 p-5 md:p-0"
  >
    <LightBtn to="/mafia/users" icon="akar-icons:people-multiple" class="p-5">
      بازیکنان
      <template #info
        >{{ _.filter(users, "active")?.length || 0 }} نفر</template
      >
    </LightBtn>

    <LightBtn to="/mafia/roles" icon="akar-icons:chat-question" class="p-5">
      نقش ها
      <template #info>{{ players?.length || 0 }} نقش</template>
    </LightBtn>

    <LightBtn
      to="/mafia/setting"
      icon="akar-icons:gear"
      class="p-5"
      :center="true"
    >
      تنظیمات
    </LightBtn>

    <hr class="my-5" />

    <LightBtn
      to="/mafia/start/set-roles"
      :disabled="
        _.filter(users, 'active')?.length != players?.length ||
        players?.length < 5
      "
      icon="akar-icons:arrow-shuffle"
      class="p-5 border-b-4 border-red-500"
      :center="true"
    >
      پخش کردن نقش ها
    </LightBtn>
    <div>
      <ul class="list-inside list-disc text-red-500">
        <li v-if="_.filter(users, 'active')?.length != players?.length">
          تعداد بازیکنان و نقش ها برابر نیست
        </li>
        <li v-if="players?.length < 5">تعداد بازیکنان باید حداقل 5 نفر باشد</li>
      </ul>
    </div>
  </div>
  <!-- <Modal>asd</Modal> -->
</template>
