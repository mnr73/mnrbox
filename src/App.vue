<script setup>
import homeLayout from "./layouts/Home.vue";
</script>

<template>
	<component :is="layout||homeLayout"></component>
  <router-view></router-view>
</template>

<style scoped>

</style>
