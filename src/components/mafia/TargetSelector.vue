<script setup>
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import _ from "lodash";
import TargetCard from "./TargetCard.vue";
import Modal from "../Modal.vue";

const selectedUsers = ref([]);
// const userActs = ref();
const text = ref();
const bool = ref();
const sniperShot = ref();

const props = defineProps({
  selector: Object,
  list: Array,
  step: Object,
});

const getRoles = computed(() => {
  // return props.game.selectedRound?.roles;
  let sorted = _.sortBy(
    props.list,
    ["dead", "getOut", "userName"],
    [, "desc", "desc", "asc"]
  );
  return sorted;
});

if (
  props.selector.role.class == "farmande" &&
  props.selector.act.type == "confirm_sniper"
) {
  sniperShot.value = _.find(props.step.acts, ["type", "sniper_shot"]);
}

const userActs = computed(() => {
  return _.filter(props.step.acts, ["user", props.selector.role]);
});

onMounted(function () {
  selectedUsers.value = _.map(
    _.filter(props.step.acts, {
      user: props.selector.role,
      type: props.selector.act.type,
    }),
    "target"
  );
  if (props.selector.act.type == "charm") {
    text.value = _.find(props.step.acts, "word")?.word;
  }
  if (props.selector.act.type == "bomb") {
    text.value = _.find(props.step.acts, "bombAct")?.bombAct;
  }
  if (props.selector.act.type == "guess_role") {
    bool.value = _.find(props.step.acts, "guess")?.guess;
  }
  // userActs.value = _.filter(props.step.acts, ["user", props.selector.role]);
});

function select(user) {
  if (props.selector.disabled.find((u) => u == user)) {
    return;
  }
  let removedUser = _.remove(selectedUsers.value, (u) => u == user);
  if (props.selector.limit === 1 && removedUser == 0) {
    selectedUsers.value = [];
  }
  if (removedUser.length == 0) {
    if (selectedUsers.value.length < props.selector.limit) {
      selectedUsers.value.push(user);
    }
  }
  _.remove(props.step.acts, {
    user: props.selector.role,
    type: props.selector.act.type,
  });
  _.each(selectedUsers.value, (u) => {
    let value = {
      user: props.selector.role,
      target: u,
      type: props.selector.act.type,
      name: props.selector.act.name,
      term: props.selector.act.term,
    };
    if (props.selector.act.type == "charm") {
      value.word = text.value;
    }
    if (props.selector.act.type == "bomb") {
      value.bombAct = text.value;
    }
    if (props.selector.act.type == "guess_role") {
      value.guess = bool.value;
    }
    props.step.acts.push(value);
  });

  emit("select");
}

function setText() {
  if (props.selector.role.class == "afsoongar" && userActs.value?.[0]) {
    userActs.value[0].word = text.value;
  }
  if (props.selector.role.class == "bomber" && userActs.value?.[0]) {
    userActs.value[0].bombAct = text.value;
  }
}

function setBool() {
  if (props.selector.role.class == "nato" && userActs.value?.[0]) {
    userActs.value[0].guess = bool.value;
  }
}

function khabGardAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    name: props.selector.act.name,
    term: props.selector.act.term,
    sacrifice: act,
  };
  props.step.acts.push(value);
  // userActs.value = _.filter(props.step.acts, ["user", props.selector.role]);
  emit("select");
}

function ghaziAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    name: props.selector.act.name,
    term: props.selector.act.term,
    cancelVote: act,
  };
  props.step.acts.push(value);
  // userActs.value = _.filter(props.step.acts, ["user", props.selector.role]);
  emit("select");
}

function farmandeAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    name: props.selector.act.name,
    term: props.selector.act.term,
    confirm: act,
  };
  props.step.acts.push(value);
  emit("select");
}

function janSakhtAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    name: props.selector.act.name,
    term: props.selector.act.term,
    stats: act,
  };
  props.step.acts.push(value);
  emit("select");
}

const emit = defineEmits(["select"]);
</script>

<template>
  <!-- <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20"
    @click.self="selector.open = false"
  >
    <div
      class="bg-white rounded-md w-full h-full max-w-xl max-h-fit mx-auto shadow-lg border flex flex-col"
    > -->
  <Modal @close="selector.open = false">
    <div class="p-2 bg-slate-100 rounded-t-md text-center">
      <div>
        {{ selector.role.userName }}
        <span class="text-slate-400 font-thin"
          ><Icon :icon="selector.role.icon" class="inline-block h-full w-6" />
          {{ selector.role.roleName }}</span
        >
      </div>
    </div>
    <div class="flex justify-between p-2 border-b rounded-t-md">
      <div>{{ props.selector.act.name }}</div>
      <div>{{ selectedUsers.length }} از {{ props.selector.limit }} انتخاب</div>
    </div>

    <div
      class="p-2 flex gap-2 items-center overflow-x-auto overflow-y-hidden h-28"
      v-if="selector.lastTime?.length"
    >
      <div class="flex-shrink-0">تارگت های قبلی:</div>
      <template v-for="(item, index) in selector.lastTime" :key="index">
        <TargetCard :item="item" :to="true" class="flex-shrink-0" />
      </template>
    </div>
    <div class="p-2" v-if="props.selector.act.type == 'charm'">
      <input
        type="text"
        class="w-full border text-xl p-1"
        placeholder="کلمه را وارد کنید"
        v-model="text"
        @input="setText"
      />
    </div>
    <div class="p-2" v-if="props.selector.act.type == 'bomb'">
      <input
        type="text"
        class="w-full border text-xl p-1"
        placeholder="اکت بمبر را وارد کنید"
        v-model="text"
        @input="setText"
      />
    </div>
    <label
      class="p-2 block text-2xl"
      v-if="props.selector.act.type == 'guess_role'"
    >
      <input type="checkbox" v-model="bool" @change="setBool" /> نقش را درست حدس
      زد؟
      <span>{{ bool ? "بله" : "خیر" }}</span>
    </label>
    <div
      v-if="
        selector.role.class == 'khabGard' && selector.act.type == 'deep_sleep'
      "
      class="p-2 flex flex-col gap-2"
    >
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        @click="khabGardAct(true)"
        :class="{
          'border-sky-500': userActs?.[0]?.sacrifice === true,
        }"
      >
        <div class="text-lg">
          <div>خودم را فدای شهر می‌کنم 👍</div>
          <div class="text-sm text-slate-400">
            در این صورت مافیا در شب بیدار نمی‌شود
          </div>
        </div>
      </div>
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        @click="khabGardAct(false)"
        :class="{
          'border-sky-500': userActs?.[0]?.sacrifice === false,
        }"
      >
        <div class="text-lg">
          <div>خودم را فدای شهر نمیکنم 👎</div>
          <div class="text-sm text-slate-400">
            در این صورت مافیا در شب بیدار می‌شود
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="
        selector.role.class == 'ghazi' && selector.act.type == 'cancel_vote'
      "
      class="p-2 flex flex-col gap-2"
    >
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        @click="ghaziAct(true)"
        :class="{
          'border-sky-500': userActs?.[0]?.cancelVote === true,
        }"
      >
        <div class="text-lg">
          <div>رای گیری را کنسل می‌کنم 👍</div>
        </div>
      </div>
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        @click="ghaziAct(false)"
        :class="{
          'border-sky-500': userActs?.[0]?.cancelVote === false,
        }"
      >
        <div class="text-lg">
          <div>رای گیری را کنسل نمی‌کنم 👎</div>
        </div>
      </div>
    </div>
    <div
      v-else-if="
        selector.role.class == 'farmande' &&
        selector.act.type == 'confirm_sniper'
      "
      class="p-2 flex flex-col gap-2"
    >
      <div v-if="sniperShot">
        تارگت اسنایپر : {{ sniperShot.target.userName }}
      </div>
      <div v-else>اسنایپر هیچ کس رو نزده :)</div>
      <template v-if="sniperShot">
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          :class="{
            'border-sky-500': userActs?.[0]?.confirm === true,
          }"
          @click="farmandeAct(true)"
        >
          <div class="text-lg">
            <div>شات اسنایپر را تایید میکنم 👍</div>
          </div>
        </div>
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          :class="{
            'border-sky-500': userActs?.[0]?.confirm === false,
          }"
          @click="farmandeAct(false)"
        >
          <div class="text-lg">
            <div>شات اسنایپر را تایید نمی‌کنم 👎</div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-else-if="
        selector.role.class == 'janSakht' && selector.act.type == 'stats'
      "
      class="p-2 flex flex-col gap-2"
    >
      <div class="text-xl p-2">آیا استعلام میخواهی؟</div>
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        :class="{
          'border-sky-500': userActs?.[0]?.stats === true,
        }"
        @click="janSakhtAct(true)"
      >
        <div class="text-lg">
          <div>استعلام میخواهم 👍</div>
        </div>
      </div>
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        :class="{
          'border-sky-500': userActs?.[0]?.stats === false,
        }"
        @click="janSakhtAct(false)"
      >
        <div class="text-lg">
          <div>استعلام نمیخواهم 👎</div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 p-2 overflow-y-auto" v-else>
      <div
        class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
        v-for="(role, index) in getRoles"
        :key="role.userId"
        @click="select(role)"
        :class="{
          'border-sky-500': selectedUsers.find((user) => user == role),
          'border-red-500': selector.disabled.find((user) => user == role),
          'opacity-60': selector.disabled.find((user) => user == role),
          'opacity-60': role.dead || role.getOut,
        }"
      >
        <div class="text-lg">
          <div class="flex gap-1 justify-center">
            <div class="border-e border-slate-400 px-1 me-1" v-if="role.dead">
              <Icon icon="mdi:dead" class="w-6 h-full" />
            </div>
            <div class="border-e border-slate-400 px-1 me-1" v-if="role.getOut">
              <Icon icon="majesticons:door-exit" class="w-6 h-full" />
            </div>
            <div>{{ role.userName }}</div>
          </div>
          <div class="text-sm text-slate-400">
            <Icon :icon="role.icon" class="inline-block h-full w-5 me-1" />{{
              role.roleName
            }}
          </div>
        </div>
      </div>
    </div>
  </Modal>
  <!-- </div>
  </div> -->
</template>
