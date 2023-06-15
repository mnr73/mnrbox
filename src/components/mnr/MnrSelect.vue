<template>
  <div
    class="mnr-input mnr-select"
    :class="[
      {
        'mnr-hover': hover,
        'mnr-focus': focus,
        'mnr-open-list': openList && !disabled,
        'mnr-disabled': disabled,
      },
      status ? 'mnr-status-' + status : '',
    ]"
    @keyup.enter="openList = !openList"
  >
    <input
      ref="checkbox"
      alt="show options"
      type="checkbox"
      v-model="openList"
      @focus="focus = true"
      @blur="focus = false"
      :disabled="disabled || loading"
    />
    <div class="mnr-title" v-if="title">
      <b>{{ title }}</b>
    </div>
    <div class="mnr-main" ref="body" :dir="inputDir">
      <div class="mnr-frame" @mouseover="hover = true" @mouseout="hover = false">
        <div class="mnr-box" @click="openHandler">
          <div class="mnr-input-icon" v-if="$slots.default">
            <slot></slot>
          </div>
          <input
            ref="search"
            class="mnr-text"
            type="text"
            v-if="search"
            v-model="searchValue"
            @input="openList = true"
            :placeholder="textValue || placeholder"
          />
          <div class="mnr-text" v-else>{{ textValue || placeholder }}</div>
          <div class="mnr-status-icon" v-if="status">
            <component :is="'mnr-icon-' + status" />
          </div>
          <div class="mnr-input-spinner" v-if="loading">
            <MnrSpinner />
          </div>
          <svg class="mnr-down-icon" viewBox="0 0 100 100">
            <path
              d="M50 61l-36 -36c-3,-3 -7,-3 -10,0 -3,3 -3,7 0,10l40 41c1,1 3,2 5,2 2,0 4,-1 5,-2l40 -41c3,-3 3,-7 0,-10 -3,-3 -7,-3 -10,0l-36 36z"
            />
          </svg>
        </div>
        <div class="mnr-options" v-show="openList && !disabled && !loading">
          <label
            class="mnr-option"
            v-for="option in filtered"
            :key="option[oValue]"
            :class="{ 'mnr-checked': option[oValue] === modelValue }"
            @mouseup="openList = false"
          >
            <input
              type="radio"
              :name="uname"
              :value="option[oValue]"
              :checked="option[oValue] === modelValue"
              @input="changeHandler(option)"
            />
            <span class="mnr-select-frame"></span>
            <span class="mnr-option-text">{{ option[oText] }}</span>
            <span class="mnr-option-hint" v-if="option[oHint]">{{ option[oHint] }}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="mnr-hint" v-if="msg || hint">
      <span>{{ msg || hint }}</span>
    </div>
  </div>
</template>

<script>
import MnrSpinner from "./MnrSpinner.vue";
import MnrIconError from "./MnrIconError.vue";
import MnrIconAccepted from "./MnrIconAccepted.vue";
import MnrIconWarning from "./MnrIconWarning.vue";

export default {
  components: {
    MnrSpinner,
    MnrIconError,
    MnrIconAccepted,
    MnrIconWarning,
  },
  props: {
    modelValue: {
      type: [String, Number, null],
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "select one",
    },
    title: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    msg: {
      type: [String, null],
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    oValue: {
      type: String,
      default: "value",
    },
    oText: {
      type: String,
      default: "text",
    },
    oHint: {
      type: String,
      default: "hint",
    },
    dText: {
      type: [String, Number, null],
      default: null,
    },
    dValue: {
      type: [String, Number, null],
      default: null,
    },
    dHint: {
      type: [String, Number, null],
      default: null,
    },
    search: {
      type: Boolean,
      default: false,
    },
    inputDir: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      focus: false,
      hover: false,
      openList: false,
      searchValue: "",
      mouseOver: false,
    };
  },
  computed: {
    uname() {
      return this.name || (Math.random() + 1).toString(36).substring(2);
    },
    filtered() {
      let options;
      if (this.search) {
        let regex = new RegExp(this.searchValue);
        options = this.options.filter(
          (item) => regex.test(item[this.oText]) || regex.test(item[this.oHint])
        );
      } else {
        options = this.options;
      }
      if (this.default?.[this.oValue] !== null) {
        return [this.default, ...options];
      }
      return options;
    },
    textValue() {
      return (
        this.filtered.find((item) => item[this.oValue] === this.modelValue)?.[
          this.oText
        ] || false
      );
    },
    default() {
      return {
        [this.oText]: this.dText,
        [this.oValue]: this.dValue,
        [this.oHint]: this.dHint,
      };
    },
  },
  watch: {
    openList(n) {
      if (!n) {
        if (this.search) {
          this.searchValue = "";
        }
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.clickHandler);
  },
  unmounted() {
    document.removeEventListener("click", this.clickHandler);
  },
  methods: {
    clickHandler(e) {
      // console.log("test", e);
      if (e.path) {
        if (!e.path.includes(this.$refs.body)) {
          this.openList = false;
          // console.log("out");
        }
      } else {
        if (this.hover == false) {
          this.openList = false;
        }
      }
    },
    openHandler() {
      this.openList = !this.openList;
      if (this.search) {
        this.$refs.search.focus();
      } else {
        this.$refs.checkbox.focus();
      }
    },
    changeHandler(option) {
      this.$emit("update:modelValue", option[this.oValue]);
    },
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-select {
    &.mnr-disabled {
      * {
        cursor: not-allowed;
      }
      opacity: 0.6;
    }
    .mnr-main {
      height: 2.9rem;
      position: relative;
    }
    .mnr-frame {
      height: 2.9rem;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      background-color: #f3f3f3;
      border-color: #dddddd;
      color: #666;
      overflow: hidden;
    }
    .mnr-box {
      display: flex;
      height: 2.9rem;
      cursor: pointer;

      input {
        border: none;
        outline: none;
        background-color: rgba(0, 0, 0, 0);
        font-family: inherit;
        &::placeholder {
          color: #666;
          opacity: 1;
        }
        &:focus::placeholder {
          color: #aaa;
        }
      }
      .mnr-text {
        display: flex;
        align-items: center;
        width: 100%;
        min-width: 1px;
        flex-shrink: 100;
        font-size: 1.1em;
        padding: 0 10px;
      }
    }
    &.mnr-hover,
    &.mnr-focus {
      &:not(.mnr-disabled) .mnr-frame {
        border-color: #4fc3f7;
      }
    }
    &.mnr-open-list .mnr-frame {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 70;
      height: auto;
      width: 100%;
      border-color: #039be5;
      box-shadow: 0 0 0 3px rgba(#039be5, 0.2);
    }
    .mnr-options {
      .mnr-option {
        &:hover:not(.mnr-disabled, .mnr-checked) {
          background-color: #eee;
          .mnr-select-frame {
            background-color: #4fc3f7;
          }
        }
        &.mnr-checked {
          .mnr-select-frame {
            border-color: #4fc3f7;
            box-shadow: 0 0 0 0.15em rgba(#4fc3f7, 0.5);
          }
        }
        .mnr-option-text {
          width: 100%;
          display: flex;
          flex-shrink: 100;
          align-items: center;
        }
        .mnr-option-hint {
          // min-width: 100%;
          color: #888;
          // font-size: 0.9em;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      }
    }
    .mnr-down-icon {
      width: 1.8em;
      padding: 0.7em;
      padding-inline-start: 0;
      fill: #666;
    }
    &.mnr-open-list .mnr-down-icon {
      transform: rotateX(180deg);
    }
    .mnr-select-frame {
      width: 1.5em;
      height: 1.5em;
      border-radius: 1000px;
      border-style: solid;
      border-width: 0.45em;
      border-color: #dddddd;
      background-color: #fbfbfb;
      display: block;
      position: relative;
      margin-inline-end: 10px;
    }
    .mnr-title {
      color: #555;
      font-size: 1.2em;
      margin-bottom: 6px;
    }
    .mnr-hint {
      color: #666;
      font-size: 0.9em;
      margin-top: 6px;
    }
    &.mnr-status-accepted {
      .mnr-box,
      .mnr-hint {
        color: #2e7d32;
      }
      .mnr-box {
        background-color: #c8e6c9;
      }
    }
    &.mnr-status-warning {
      .mnr-box,
      .mnr-hint {
        color: #e65100;
      }
      .mnr-box {
        background-color: #ffecb3;
      }
    }
    &.mnr-status-error {
      .mnr-box,
      .mnr-hint {
        color: #c62828;
      }
      .mnr-box {
        background-color: #ffcdd2;
      }
    }
    .mnr-input-icon,
    .mnr-input-spinner,
    .mnr-status-icon {
      display: flex;
      height: 100%;
      padding: 0.5em;
      color: #666;
      width: 2.2em;
      &.mnr-input-icon {
        padding-inline-end: 0;
      }
      &.mnr-status-icon {
        padding: 0.2em 0;
        color: inherit;
      }
      &.mnr-input-spinner {
        padding: 0.7em;
        padding-inline-start: 0;
      }
      svg {
        fill: currentColor;
      }
    }
  }
}
</style>
