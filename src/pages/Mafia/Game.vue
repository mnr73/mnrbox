<script setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import { Icon } from "@iconify/vue";
import soundMafia1 from "@p/audio/mafia1.mp3";
import TimerPart from "@/components/mafia/TimerPart.vue";
import NightStory from "@/components/mafia/NightStory.vue";
import DayStory from "@/components/mafia/DayStory.vue";
import VoteOneStory from "@/components/mafia/VoteOneStory.vue";
import VoteTwoStory from "@/components/mafia/VoteTwoStory.vue";
import DefenseStory from "@/components/mafia/DefenseStory.vue";
import GhaziStory from "@/components/mafia/GhaziStory.vue";
import ShahrdarFadayiStory from "@/components/mafia/ShahrdarFadayiStory.vue";
import UserList from "@/components/mafia/UserList.vue";
import RoundDetails from "@/components/mafia/RoundDetails.vue";
import roundStructure from "@/modules/mafia/roundStructure";
import PlayersSeatOrder from "@/components/mafia/PlayersSeatOrder.vue";
import CustomMusic from "@/components/mafia/CustomMusic.vue";

const data = new mafia();
const daysBox = ref(null);
const seatOrder = ref(false);
const changeMusic = ref(false);
const track = reactive({
  audio: new Audio(soundMafia1),
  custom: null,
  paused: true,
});
const timerPanel = ref(false);
const speak = reactive({
  paused: false,
  time: 40,
  remain: 40,
  counter: null,
});
const challenge = reactive({
  paused: false,
  time: 20,
  remain: 20,
  counter: null,
});
const userList = reactive({
  open: false,
});
const roundList = reactive({
  open: false,
});

const game = reactive({
  rounds: [],
  end: false,
  privetMode: false,
  roles: [],
  lastRoundNumber: null,
  selectedRound: {},
  selectedStep: {},
  selector: {
    open: false,
    role: {},
    limit: 1,
    disabled: [],
    act: {},
    roundActs: {},
    lastTime: [],
  },
});

game.roles = data.getPlayers([]);
// game.roles = _.map(game.roles, (role) => {
//   role.vote1 = 0;
//   role.vote2 = 0;
//   return role;
// });

let rounds_structure = roundStructure(game);

onMounted(() => {
  // data.deleteGame();
  let savedGame = data.getGame();

  if (savedGame != undefined && savedGame?.end === false) {
    game.end = savedGame.end;
    game.lastRoundNumber = savedGame.lastRoundNumber;
    game.rounds = savedGame.rounds;
  } else {
    addRound();
    game.lastRoundNumber = game.rounds.length - 1;
  }

  game.calcActs();
});

function addRound() {
  if (game.rounds.length == 0) {
    let round = _.cloneDeep(rounds_structure);
    round.steps = _.pick(round.steps, ["night", "day"]);
    game.rounds.push(round);
  } else if (game.lastRoundNumber >= game.rounds.length - 1) {
    game.rounds.push(_.cloneDeep(rounds_structure));
  }
}

game.selectedRound = computed(() => {
  return game.rounds[game.lastRoundNumber];
});

game.selectedStep = computed(() => {
  return _.find(game.selectedRound?.steps, [
    "number",
    game.selectedRound?.stepNumber,
  ]);
});

game.userTargets = computed(() => {
  if (game.selectedStep?.type == "night") {
    return _.groupBy(
      _.filter(game.selectedStep?.acts, "target"),
      "user.userId"
    );
  } else {
    return _.groupBy(
      _.filter(_.flatMap(game.selectedRound.steps, "acts"), {
        target: {},
        term: "day",
      }),
      "user.userId"
    );
  }
});

game.userActs = computed(() => {
  return _.groupBy(_.reject(game.selectedStep?.acts, "target"), "user.userId");
});

game.playerCounts = computed(() => {
  return _.filter(game.selectedRound.roles, {
    dead: false,
    getOut: false,
  }).length;
});

game.userTargetBy = computed(() => {
  if (game.selectedStep?.type == "night") {
    return _.groupBy(
      _.filter(game.selectedStep?.acts, "target"),
      "target.userId"
    );
  } else {
    return _.groupBy(
      _.filter(_.flatMap(game.selectedRound.steps, "acts"), {
        target: {},
        term: "day",
      }),
      "target.userId"
    );
  }
});

function nextStep() {
  scroll(0, 0);
  let maxNumber = _.max(_.map(game.selectedRound.steps, "number"));
  if (game.selectedRound.stepNumber < maxNumber) {
    game.selectedRound.stepNumber++;
    _.find(game.selectedRound.steps, [
      "number",
      game.selectedRound.stepNumber,
    ]).active = true;
  } else {
    addRound();
    game.lastRoundNumber++;
    daysBox.value.scrollLeft = -10000;
  }
  if (["night", "ghazi", "shahrdar"].includes(game.selectedStep.type)) {
    toggleSound("play");
  } else {
    toggleSound("stop");
  }
  data.updateGame(game);
  game.calcActs();
}

/**
 * add roles in each round
 */
watch(
  () => game.lastRoundNumber,
  (newValue, oldValue) => {
    if (game.rounds[game.lastRoundNumber].roles == undefined) {
      if (game.lastRoundNumber == 0) {
        game.rounds[game.lastRoundNumber].roles = _.cloneDeep(game.roles);
      } else {
        game.rounds[game.lastRoundNumber].roles = _.cloneDeep(
          game.rounds[game.lastRoundNumber - 1].roles
        );

        _.each(game.rounds[game.lastRoundNumber].roles, (role) => {
          role.vote1 = 0;
          role.vote2 = 0;
        });
      }
    }
  },
  { deep: false }
);

game.calcActs = function () {
  game.acts = game.calcActsStats(_.dropRight(game.rounds));
  game.calcRoundActs();
};

game.calcRoundActs = function () {
  game.roundActs = game.calcActsStats([_.last(game.rounds)]);
  data.updateGame(game);
};

game.bombExplode = function (act) {
  act.exploded = !act.exploded;
  game.calcActs();
};

game.select = function (role, act) {
  game.selector.limit = 1;
  if (role?.acts?.[act.type]?.targets) {
    if (typeof role.acts[act.type].targets == "object") {
      game.selector.limit = _.orderBy(
        role.acts[act.type].targets,
        "players",
        "desc"
      ).find((o) => o.players <= game.playerCounts).value;
    } else if (typeof role.acts[act.type].targets == "number") {
      game.selector.limit = role.acts[act.type].targets;
    }
  }
  game.selector.role = role;
  game.selector.open = true;
  game.selector.act = act;
  game.selector.disabled = [];
  if (role.class == "tofangdar") {
    if (act.type == "true_gun") {
      game.selector.disabled = _.map(
        _.filter(game.selectedStep.acts, (act) => {
          return act.user == role && act.type == "fake_gun";
        }),
        "target"
      );
    } else if (act.type == "fake_gun") {
      game.selector.disabled = _.map(
        _.filter(game.selectedStep.acts, (act) => {
          return act.user == role && act.type == "true_gun";
        }),
        "target"
      );
    }
  }
  if (
    game.rounds[game.lastRoundNumber - 1]?.steps?.[game.selectedStep.type]
      ?.acts != undefined
  ) {
    game.selector.lastTime = _.filter(
      game.rounds[game.lastRoundNumber - 1].steps[game.selectedStep.type].acts,
      (a) => a.user.class == role.class && a.type == act.type
    );
  }
};

game.allActs = computed(() => {
  let all = _.cloneDeep(game.acts);
  _.each(game.roundActs, (roleActs, key) => {
    if (all[key]) {
      _.each(all[key], (acts, typeKey) => {
        acts.count += roleActs[typeKey].count;
        acts.selfCount += roleActs[typeKey].selfCount;
      });
    } else {
      all[key] = roleActs;
    }
  });
  return all;
});

game.calcActsStats = function (round) {
  let actsOrgList = _.flatMapDeep(round, (round) => {
    return _.map(round.steps, (step) => {
      return step.acts;
    });
  });
  let actsList = _.filter(actsOrgList);
  actsList = _.groupBy(actsList, "user.class");

  actsList = _.mapValues(actsList, (acts) => {
    acts = _.groupBy(acts, "type");
    acts = _.mapValues(acts, (a) => {
      if (a[0]?.type == "deep_sleep") {
        a = _.filter(a, "sacrifice");
      }
      if (a[0]?.type == "confirm_sniper") {
        a = _.filter(a, "confirm");
      }
      if (a[0]?.user?.class == "janSakht" && a[0]?.type == "stats") {
        a = _.filter(a, "stats");
      }
      if (a[0]?.user?.class == "ghazi" && a[0]?.type == "cancel_vote") {
        a = _.filter(a, "cancelVote");
      }
      if (a.length) {
        let result = {
          count: a.length,
          name: a[0].name,
          selfCount: a.filter((x) => x.user == x.target).length,
        };
        if (a[0].type == "bomb") {
          result.exploded = a.filter((x) => x.exploded).length;
        }
        if (a[0].type == "true_gun") {
          result.trueShots = actsOrgList.filter(
            (x) => x.type == "shot_true_gun"
          ).length;
        }

        return result;
      }
    });
    return _.omitBy(acts, (a) => {
      return a == undefined;
    });
  });
  // return actsList;
  return _.omitBy(actsList, (a) => {
    return _.values(a).length == 0;
  });
};

function toggleSound(op = "toggle") {
  let currentTrack = track.custom || track.audio;
  currentTrack.loop = true;
  if (track.paused && (op == "toggle" || op == "play")) {
    currentTrack.currentTime = 0;
    currentTrack.play();
  } else if (track.paused == false && (op == "toggle" || op == "stop")) {
    currentTrack.pause();
  }
  track.paused = { toggle: !track.paused, stop: true, play: false }[op];
}

function changeStep(step) {
  if (step.active) {
    game.selectedRound.stepNumber = step.number;
  }
}

function changeRound(roundNumber) {
  game.lastRoundNumber = roundNumber;
}

function timerStart(timer) {
  clearInterval(timer.counter);
  timer.remain = timer.time;
  timer.paused = true;
}
</script>

<template>
  <div class="bg-slate-100 border-b flex flex-row-reverse p-1 gap-1">
    <button
      class="w-10 bg-slate-200 h-full flex justify-center p-1 rounded-md"
      @click="seatOrder = !seatOrder"
    >
      <Icon icon="akar-icons:descending" class="h-full w-6" />
    </button>
    <button
      class="w-10 bg-slate-200 h-full flex justify-center p-1 rounded-md"
      :class="{ '!bg-red-500 text-white': track.custom !== null }"
      @click="changeMusic = !changeMusic"
    >
      <Icon icon="akar-icons:music-note" class="h-full w-6" />
    </button>
    <button
      class="w-10 bg-slate-200 h-full flex justify-center p-1 rounded-md"
      :class="{ '!bg-red-500 text-white': game.privetMode }"
      @click="game.privetMode = !game.privetMode"
    >
      <Icon icon="akar-icons:eye-slashed" class="h-full w-6" />
    </button>
  </div>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm" ref="daysBox">
    <div class="flex gap-2">
      <div
        class="bg-slate-700 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
        style="min-width: 2rem"
        :class="{ '!bg-sky-600': game.lastRoundNumber == index }"
        v-for="(round, index) in game.rounds"
        :key="index"
        @click="changeRound(index)"
      >
        {{ index || "معارفه" }}
      </div>
      <div class="w-10 flex-shrink-0"></div>
    </div>
  </div>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm">
    <div class="flex gap-2 font-light">
      <template v-for="(step, key) in game.selectedRound?.steps" :key="key">
        <div
          class="bg-slate-400 text-white px-2 py-1 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
          :class="{
            '!bg-sky-600': game.selectedRound.stepNumber == step.number,
            '!bg-slate-800':
              step.active && game.selectedRound.stepNumber != step.number,
          }"
          v-if="game.lastRoundNumber != 0 || step.number < 2"
          @click="changeStep(step)"
        >
          {{ step.name }}
        </div>
      </template>
      <div class="w-1 flex-shrink-0"></div>
    </div>
  </div>
  <div class="sm:p-5 p-2 pb-60 max-w-screen-md mx-auto">
    <div v-if="game.lastRoundNumber == 0 && game.selectedStep.type == 'night'">
      <div class="p-4">
        <h2 class="text-xl font-bold text-red-600">توجه:</h2>
        <p>
          در بعضی از سناریو ها تیم مافیا در شب قبل از معارفه بیدار شده و یک دیگر
          را می‌شناسند. یا نوستراداموس بیدار شده و پیشبینی می‌کند. اگر نمیخواهید
          در شب معارفه کاری انجام شود از این مرحله گذر کنید.
        </p>
      </div>
    </div>
    <div v-if="game.lastRoundNumber == 1 && game.selectedStep.type == 'night'">
      <div class="p-4">
        <h2 class="text-xl font-bold text-red-600">توجه:</h2>
        <p>
          اگر در شب قبل از معارفه مافیا یکدیگر را شناخته باشند بازی از امشب شروع
          می‌شود. در غیر این صورت امشب فقط مافیا یک دیگر را می‌شناسند. فراماسون
          یکدیگر را می‌شناسند و نوستراداموس پیشبینی می‌کند.
        </p>
      </div>
    </div>

    <!--
				night step
			-->
    <NightStory :game="game" v-if="game.selectedStep?.type == 'night'" />

    <DayStory :game="game" v-if="game.selectedStep?.type == 'day'" />

    <VoteOneStory :game="game" v-if="game.selectedStep?.type == 'vote_1'" />

    <DefenseStory :game="game" v-if="game.selectedStep?.type == 'defense'" />

    <GhaziStory :game="game" v-if="game.selectedStep?.type == 'ghazi'" />

    <VoteTwoStory :game="game" v-if="game.selectedStep?.type == 'vote_2'" />

    <ShahrdarFadayiStory
      :game="game"
      v-if="game.selectedStep?.type == 'shahrdar'"
    />

    <div class="h-60"></div>
  </div>

  <UserList :game="game" :userList="userList" v-show="userList.open" />
  <RoundDetails :game="game" :userList="roundList" v-show="roundList.open" />
  <PlayersSeatOrder :game="game" v-if="seatOrder" @close="seatOrder = false" />
  <CustomMusic
    :game="game"
    :track="track"
    v-if="changeMusic"
    @close="changeMusic = false"
  />

  <Bottom>
    <div class="bg-slate-50 border-t" v-show="timerPanel">
      <div class="flex gep-2 justify-around">
        <TimerPart :timer="speak" @start="timerStart(challenge)" />
        <div class="border-r"></div>
        <TimerPart :timer="challenge" @start="timerStart(speak)" />
      </div>
    </div>

    <div class="p-2 border-t flex h-16 gap-2">
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl"
        :class="{ '!bg-red-700': !track.paused }"
        @click="toggleSound()"
      >
        <Icon icon="akar-icons:music" class="inline-block w-10 h-full" />
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl"
        :class="{ '!bg-red-700': timerPanel }"
        @click="timerPanel = !timerPanel"
      >
        <Icon icon="akar-icons:alarm" class="inline-block w-10 h-full" />
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl"
        :class="{ '!bg-red-700': roundList.open }"
        @click="roundList.open = true"
      >
        <Icon icon="akar-icons:clipboard" class="inline-block w-10 h-full" />
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl"
        :class="{ '!bg-red-700': userList.open }"
        @click="userList.open = true"
      >
        <Icon icon="akar-icons:people-group" class="inline-block w-10 h-full" />
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-6/12 rounded-2xl"
        @click="nextStep"
      >
        بعدی
        <Icon
          icon="akar-icons:arrow-left-thick"
          class="inline-block w-10 h-full"
        />
      </button>
    </div>
  </Bottom>
</template>
