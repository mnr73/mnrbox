<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <div class="grid grid-cols-2 sm:mt-20 text-center gap-2 p-2">
    <div>
      <router-link
        to="/mafia"
        class="w-40 max-w-full block mx-auto bg-gray-100 rounded-b-3xl rounded-t-[40px] shadow-xl"
      >
        <div
          class="w-40 max-w-full aspect-square rounded-[40px] bg-red-500 p-3"
        >
          <img src="@p/mafia.svg" class="text-gray-900" alt="" />
        </div>
        <div class="py-4"><b>مافیا (گاد)</b></div>
      </router-link>
    </div>
    <!-- <div>
      <div class="w-40 max-w-full block mx-auto bg-gray-100 rounded-2xl shadow-md">
        <div class="w-40 max-w-full aspect-square rounded-2xl bg-emerald-500"></div>
        <div class="py-4"><b>مافیا (شهر)</b></div>
      </div>
    </div> -->
  </div>
</template>
