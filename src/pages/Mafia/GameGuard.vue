<script setup>
import mafia from "@/modules/mafia";
import _ from "lodash";

import { useRouter } from "vue-router";

const router = useRouter();

const data = new mafia();

function endGame() {
  data.deleteGame();
  data.deletePlayers();
  router.push("/mafia");
}
</script>

<template>
  <div class="p-5 w-72 bg-white border mt-10 mx-auto">
    <p class="text-center">شما یک بازی تمام نشده دارید.</p>
    <div class="flex gap-2 mt-5 justify-center">
      <router-link
        to="/mafia/game"
        class="bg-emerald-500 rounded-md p-2 text-white"
        >ادامه بازی</router-link
      >
      <button class="bg-red-500 rounded-md p-2 text-white" @click="endGame()">
        پایان بازی
      </button>
    </div>
  </div>
</template>
