<script setup>
import homeLayout from "./layouts/Home.vue";
import mafiaLayout from "./layouts/Mafia.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";

const route = useRoute();
const router = useRouter();

const layout = computed(function () {
  // return route.meta.layout ? eval(`${route.meta.layout}Layout`) : homeLayout;
	return { homeLayout, mafiaLayout }?.[`${route.meta.layout}Layout`] || homeLayout;
});
</script>

<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<style scoped></style>
