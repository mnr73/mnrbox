<script setup>
import { Icon } from "@iconify/vue";
import TargetCard from "./TargetCard.vue";

const props = defineProps({
  role: Object,
  step: Object,
  game: Object,
});
</script>

<template>
  <div class="rounded-md border border-r-4 border-slate-300">
    <div
      class="p-2 bg-slate-100 font-bold border-b rounded-t-md flex justify-between"
      v-if="props.step?.type == 'night'"
    >
      <div
        :class="{
          'text-red-600': props.role.side == 'mafia',
          'text-emerald-600': props.role.side == 'city',
          'text-amber-600': props.role.side == 'independent',
          'text-slate-600': props.role.side == 'gray',
        }"
      >
        <Icon :icon="props.role.icon" class="inline-block mx-1 h-full w-6" />
        {{ props.role?.roleName }}
      </div>
      <div class="text-slate-400 font-thin">
        {{ props.role?.userName }}
      </div>
    </div>
    <div
      class="p-2 bg-slate-100 font-bold border-b rounded-t-md flex justify-between"
      v-else
    >
      <div>
        {{ props.role?.userName }}
      </div>
      <div class="text-slate-400 font-thin">
        <Icon :icon="props.role.icon" class="inline-block mx-1 h-full w-6" />
        {{ props.role?.roleName }}
      </div>
    </div>

    <div
      class="bg-slate-50 border-b p-1 flex gap-2"
      v-if="
        props.game.allActs?.[role.class] &&
        props.game.selectedStep.type == 'night'
      "
    >
      <template
        v-for="(item, index) in props.game.allActs[role.class]"
        :key="index"
      >
        <div class="flex gap-2 bg-slate-100 border p-1 rounded-md">
          <div>{{ item.name }} : {{ item.count }}</div>
          <div v-if="item.selfCount">خودش : {{ item.selfCount }}</div>
          <div v-if="item.exploded">منفجر شده : {{ item.exploded }}</div>
          <div v-if="item.trueShots">شلیک شده : {{ item.trueShots }}</div>
        </div>
      </template>
    </div>
    <div class="p-2">
      <div v-if="role.class == 'khabGard'" class="p-2">
        <div v-if="props.game.userActs[role.userId]?.[0]?.sacrifice">
          خودش را فدای شهر کرد 👍
        </div>
        <div
          v-else-if="props.game.userActs[role.userId]?.[0]?.sacrifice === false"
        >
          خودش را فدای شهر نکرد 👎
        </div>
      </div>
      <div v-if="role.class == 'farmande'" class="p-2">
        <div v-if="props.game.userActs[role.userId]?.[0]?.confirm">
          شات اسنایپر را تایید کرد 👍
        </div>
        <div
          v-else-if="props.game.userActs[role.userId]?.[0]?.confirm === false"
        >
          شات اسنایپر را تایید نکرد 👎
        </div>
      </div>
      <div v-if="role.class == 'janSakht'" class="p-2">
        <div v-if="props.game.userActs[role.userId]?.[0]?.stats">
          استعلام میخواهد 👍
        </div>
        <div v-else-if="props.game.userActs[role.userId]?.[0]?.stats === false">
          استعلام نمی‌خواهد 👎
        </div>
      </div>
      <div
        class="flex flex-wrap gap-1 p-2 items-center"
        v-if="props.game.userTargets[role.userId]?.length"
      >
        <div>تارگت ها:</div>
        <template
          v-for="(item, index) in props.game.userTargets[role.userId]"
          :key="index"
        >
          <TargetCard :item="item" :to="true" />
        </template>
      </div>
      <div
        class="flex flex-wrap gap-1 p-2 items-center"
        v-if="props.game.userTargetBy[role.userId]?.length"
      >
        <div>تارگت شده توسط:</div>
        <template
          v-for="(item, index) in props.game.userTargetBy[role.userId]"
          :key="index"
        >
          <TargetCard :item="item" :to="false" />
        </template>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
