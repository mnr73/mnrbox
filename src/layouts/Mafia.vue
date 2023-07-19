<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const version = __APP_VERSION__;

const router = useRouter();
const route = useRoute();

const menu = ref(false);

router.beforeEach(() => {
  menu.value = false;
});
</script>

<template>
  <header class="bg-red-500 h-12 flex fixed w-full z-50">
    <button
      class="absolute right-0 top-0 h-full w-14 text-white p-2"
      @click="menu = !menu"
    >
      <Icon icon="akar-icons:more-vertical" class="h-full w-full" />
    </button>
    <h1
      class="w-full flex justify-center items-center text-white font-bold"
      @click="menu = false"
    >
      مافیا
    </h1>
  </header>
  <div class="bg-gray-50 min-h-screen pt-12 xl:container mx-auto">
    <slot></slot>
  </div>

  <div
    class="w-full h-full fixed bg-white bg-opacity-50 top-0 left-0 z-40"
    v-show="menu"
    @click.self="menu = false"
  >
    <div
      class="w-9/12 max-w-sm h-full pt-12 bg-slate-50 border-e flex flex-col"
    >
      <div class="h-full overflow-auto">
        <router-link
          to="/mafia"
          class="block p-3 border-b"
          :class="{ '!bg-slate-700 text-white': route.path == '/mafia' }"
          >مافیا</router-link
        >
        <router-link
          to="/mafia/users"
          class="block p-3 border-b"
          :class="{ '!bg-slate-700 text-white': route.path == '/mafia/users' }"
          >کاربران</router-link
        >
        <router-link
          to="/mafia/roles"
          class="block p-3 border-b"
          :class="{ '!bg-slate-700 text-white': route.path == '/mafia/roles' }"
          >نقش ها</router-link
        >
        <router-link
          to="/mafia/setting"
          class="block p-3 border-b"
          :class="{
            '!bg-slate-700 text-white': route.path == '/mafia/setting',
          }"
          >تنظیمات</router-link
        >
        <router-link
          to="/"
          class="block p-3 border-b"
          :class="{ '!bg-slate-700 text-white': route.path == '/' }"
          >صفحه اصلی برنامه</router-link
        >
      </div>
      <div class="h-14 p-1 bg-slate-100 border-t text-center shrink-0">
        <div>version: {{ version }}</div>
        <a href="https://mnrtech.ir" class="font-bold text-sky-500">mnr tech</a>
      </div>
    </div>
  </div>
</template>
