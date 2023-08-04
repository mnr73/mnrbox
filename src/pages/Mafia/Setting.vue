<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import mafia from "@/modules/mafia";
import Bottom from "@/components/Bottom.vue";
import LightBtn from "@/components/btn/LightBtn.vue";

const data = new mafia();

function deleteAll() {
  localStorage.removeItem("mafia");
}

// function deleteUsers() {
// 	data.deleteUser
// }

// function deleteRoles() {}
</script>
<template>
  <div class="p-2">
    <div class="p-5 max-w-lg bg-white border mt-10 mx-auto">
      <!-- <div class="my-2">
        <h2 class="font-bold text-lg">ریست کردن نقش های بازی</h2>
        <p class="mt-5">
          با انجام این کار کل نقش های بازی و تنظیمات آن به حالت پیشفرض ریست
          می‌شود
        </p>
        <button class="bg-red-500 text-white rounded-md p-2 mt-5" @click="deleteRoles()">
          ریست کردن نقش ها
        </button>
      </div>

      <div class="my-10">
        <h2 class="font-bold text-lg">حذف دیتا کاربران</h2>
        <p class="mt-2">
          با این کار کل دیتا کاربران در حافظه پاک می‌شود و باید از ابتدا آنها را
          تعریف کنید
        </p>
        <button class="bg-red-500 text-white rounded-md p-2 mt-5" @click="deleteUsers()">
          حذف کاربران
        </button>
      </div> -->

      <div class="my-10">
        <h2 class="font-bold text-lg">حذف همه دیتا</h2>
        <p class="mt-2">
          تمام دیتا ذخیره شده بازی مافیا حذف می‌شود. از جمله کاربران. نقش ها،
          بازی و ...
        </p>
        <button
          class="bg-red-500 text-white rounded-md p-2 mt-5"
          @click="deleteAll()"
        >
          حذف همه
        </button>
      </div>
    </div>
    <div class="h-60"></div>
  </div>

  <Bottom>
    <div class="p-1 bg-slate-100 max-w-lg mx-auto">
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
