<script setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import RoleCard from "@/components/mafia/RoleCard.vue";
import TargetSelector from "@/components/TargetSelector.vue";

const data = new mafia();
const daysBox = ref(null);
const users = ref();
const selector = reactive({
  open: false,
  role: {},
  type: "target",
});
const rounds = ref([]);
const selectedIndex = ref();
const game = reactive({
  zeroNight: null,
  rounds: rounds.value,
  roles: [],
});

users.value = data.getActiveUsers();
game.roles = data.getPlayers([]);

let rounds_structure = {
  stepNumber: 0,
  steps: {
    night: {
      number: 0,
      type: "night",
      active: true,
      name: "شب",
      target_by: {},
    },
    day: {
      number: 1,
      type: "day",
      active: false,
      name: "روز",
      target_by: {},
    },
    vote_1: {
      number: 2,
      type: "vote_1",
      active: false,
      name: "رای 1",
      votes: {},
    },
    defense: {
      number: 3,
      type: "defense",
      active: false,
      name: "دفاع",
      target_by: {},
    },
    vote_2: {
      number: 4,
      type: "vote_2",
      active: false,
      name: "رای 2",
      votes: {},
    },
  },
};

if (_.find(game.roles, ["class", "ghazi"])) {
  rounds_structure.steps.ghazi = {
    number: _.max(_.map(rounds_structure.steps, "number")) + 1,
    type: "ghazi",
    active: false,
    name: "قاضی",
    do: null,
    role: null,
  };
}
if (_.find(game.roles, ["class", "shahrdar"])) {
  rounds_structure.steps.shahrdar = {
    number: _.max(_.map(rounds_structure.steps, "number")) + 1,
    type: "shahrdar",
    active: false,
    name: "شهردار",
    veto: null,
  };
}

onMounted(() => {
  rounds.value.push(_.cloneDeep(rounds_structure));
  selectedIndex.value = rounds.value.length - 1;
  // game.value.rounds = rounds.value
});

const selectedRound = computed(() => {
  return rounds.value[selectedIndex.value];
});

const selectedStep = computed(() => {
  return _.find(selectedRound.value?.steps, [
    "number",
    selectedRound.value?.stepNumber,
  ]);
});

const getRoles = computed(() => {
  _.each(game.roles, function (r) {
    r.mode = selectedStep.value?.type;
  });

  if (selectedStep.value?.type == "night") {
    let filtered = _.filter(game.roles, "nightAwake");
    return {
      beforeMafia: {
        name: "قبل از مافیا",
        roles: _.remove(filtered, (role) => {
          return (
            role.class == "nostradamus" ||
            role.class == "saghi" ||
            role.class == "negahban"
          );
        }),
      },
      mafia: {
        name: "ساید مافیا",
        roles: _.remove(filtered, (role) => {
          return role.side == "mafia" && role.alone?.value != true;
        }),
      },
      aloneMafia: {
        name: "مافیای مستقل",
        roles: _.remove(filtered, (role) => {
          return role.side == "mafia" && role.alone?.value == true;
        }),
      },
      cities: {
        name: "ساید شهر",
        roles: _.remove(filtered, (role) => {
          return role.side == "city";
        }),
      },
      independent: {
        name: "ساید مستفل",
        roles: _.remove(filtered, (role) => {
          return role.side == "independent";
        }),
      },
      sleep: {
        name: "افراد خواب",
        roles: _.filter(game.roles, ["nightAwake", false]),
      },
    };
  }

  return game.roles;
});

function nextStep() {
  if (selectedIndex.value == 0) {
    if (selectedRound.value.stepNumber === 0) {
      selectedRound.value.stepNumber = 1;
      selectedRound.value.steps.day.active = true;
      return;
    }
  } else {
    let maxNumber = _.max(_.map(selectedRound.value.steps, "number"));
    if (selectedRound.value.stepNumber < maxNumber) {
      selectedRound.value.stepNumber++;
      _.find(selectedRound.value.steps, [
        "number",
        selectedRound.value.stepNumber,
      ]).active = true;
      return;
    }
  }
  rounds.value.push(_.cloneDeep(rounds_structure));
  selectedIndex.value++;
  daysBox.value.scrollLeft = -10000;
}

function select(role) {
  selector.role = role;
  selector.open = true;
}

watch(
  () => selectedIndex.value,
  (newValue, oldValue) => {
    rounds.value[selectedIndex.value].roles = _.cloneDeep(game.roles);
  },
  { deep: false }
);
</script>

<template>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm" ref="daysBox">
    <div class="flex gap-2">
      <div
        class="bg-slate-700 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0"
        style="min-width: 2rem"
        :class="{ '!bg-sky-600': selectedIndex == index }"
        v-for="(round, index) in rounds"
        :key="index"
      >
        {{ index || "معارفه" }}
      </div>
      <div class="w-10 flex-shrink-0"></div>
    </div>
  </div>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm">
    <div class="flex gap-2 font-light">
      <template v-for="(round, key) in selectedRound?.steps" :key="key">
        <div
          class="bg-slate-400 text-white px-2 py-1 rounded-full flex items-center justify-center flex-shrink-0"
          :class="{
            '!bg-sky-600': selectedRound.stepNumber == round.number,
            '!bg-slate-800':
              round.active && selectedRound.stepNumber != round.number,
          }"
          v-if="selectedIndex != 0 || round.number < 2"
        >
          {{ round.name }}
        </div>
      </template>
      <div class="w-1 flex-shrink-0"></div>
    </div>
  </div>
  <div class="sm:p-5 p-2 mb-60">
    <div v-if="selectedIndex == 0 && selectedStep.type == 'night'">
      <div class="p-4">
        در بعضی از سناریو ها تیم مافیا در شب قبل از معارفه بیدار شده و یک دیگر
        را می‌شناسند.
      </div>
      <div class="flex gap-5 justify-center">
        <button
          class="bg-slate-200 shadow-lg p-2 rounded-md"
          :class="{ 'bg-sky-500 text-white': game.zeroNight === true }"
          @click="game.zeroNight = true"
        >
          شناختند
        </button>
        <button
          class="bg-slate-200 shadow-lg p-2 rounded-md"
          :class="{ 'bg-sky-500 text-white': game.zeroNight === false }"
          @click="game.zeroNight = false"
        >
          لازم نیست
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col gap-3">
      <div class="" v-if="selectedStep?.type == 'night'">
        <template v-for="(roles, key) in getRoles" :key="key">
          <div v-if="roles.roles?.length" class="my-5">
            <h2 class="text-lg font-bold text-sky-500 p-2">{{ roles.name }}</h2>
            <hr class="border-sky-500 border-2 mb-2" />
            <div class="flex flex-col gap-3">
              <template v-for="(role, index) in roles.roles" :key="role.userId">
                <hr
                  class="my-1 border-2 border-dashed border-slate-400"
                  v-if="
                    index > 0 &&
                    (role.side != 'mafia' || role.alone) &&
                    key != 'sleep'
                  "
                />
                <RoleCard :role="role">
                  <div class="p-2">
                    <button
                      v-if="key != 'sleep'"
                      class="bg-amber-500 text-white p-1 w-full rounded-md"
                      @click="select(role)"
                    >
                      انتخاب تارگت
                    </button>
                  </div>
                </RoleCard>
              </template>
            </div>
          </div>
        </template>
      </div>
      <template v-else v-for="role in getRoles" :key="role.userId">
        <RoleCard :role="role"> body </RoleCard>
      </template>
    </div>
  </div>
  <TargetSelector
    v-if="selector.open"
    :selector="selector"
    :list="selectedRound.roles"
  ></TargetSelector>
  <Bottom>
    <div class="p-2 border-t flex h-16 gap-2">
      <button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">
        موزیک
      </button>
      <button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">
        تایمر
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-6/12 rounded-2xl"
        @click="nextStep"
      >
        مرحله بعد
      </button>
    </div>
  </Bottom>
</template>
