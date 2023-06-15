<template>
  <div
    class="mnr-input mnr-multi-select"
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
    <div
      class="mnr-main"
      ref="body"
      :dir="inputDir"
      :style="{
        height: 'calc(2.9rem + ' + tagsHeight + 'px)',
      }"
    >
      <div class="mnr-frame" @mouseover="hover = true" @mouseout="hover = false">
        <div
          class="mnr-tags"
          ref="tags"
          v-if="showTags"
          v-show="selectedItems.length > 0"
        >
          <div
            class="mnr-tag"
            v-for="tag in selectedItems"
            :key="tag[oValue]"
            @click="changeHandler(tag)"
          >
            <div class="mnr-tag-close">
              <svg viewBox="0 0 100 100">
                <path
                  d="M8 8c4,-4 10,-4 14,-1l1 1 27 27 27 -27c4,-4 11,-4 15,0 4,4 4,10 1,14l-1 1 -27 27 27 27c4,4 4,11 0,15 -4,4 -10,4 -14,1l-1 -1 -27 -27 -27 27c-4,4 -11,4 -15,0 -4,-4 -4,-10 -1,-14l1 -1 27 -27 -27 -27c-4,-4 -4,-11 0,-15z"
                />
              </svg>
            </div>
            <div class="mnr-tag-text">{{ tag[oText] }}</div>
          </div>
        </div>
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
            :placeholder="placeHolderText"
          />
          <div class="mnr-text" v-else>{{ placeHolderText }}</div>
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
            v-for="(option, key) in filtered"
            :key="option[oValue]"
            :class="{
              'mnr-checked': modelValue.includes(option[oValue]),
            }"
          >
            <input
              type="checkbox"
              :name="uname"
              :value="option[oValue]"
              :checked="modelValue.includes(option[oValue])"
              @input="changeHandler(option, key)"
            />
            <span class="mnr-select-frame">
              <svg viewBox="0 0 100 100">
                <path
                  d="M36 65l-21 -21 -1 -1c-3,-3 -8,-2 -11,1 -3,3 -3,9 0,12l28 28 1 1c3,3 8,2 11,-1l55 -55 1 -1c3,-3 2,-8 -1,-11 -3,-3 -9,-3 -12,0l-49 49z"
                />
              </svg>
            </span>
            <span class="mnr-option-text">{{ option[oText] }}</span>
            <span class="mnr-option-hint">{{ option[oHint] }}</span>
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
      type: Array,
      default() {
        return [];
      },
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
    showTags: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "select one",
    },
    someText: {
      type: String,
      default: "",
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
      type: String,
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
    search: {
      type: Boolean,
      default: false,
    },
    inputDir: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      focus: false,
      hover: false,
      openList: false,
      // textValue: "",
      tagsHeight: 0,
      searchValue: "",
      mouseOver: false,
    };
  },
  computed: {
    uname() {
      return this.name || (Math.random() + 1).toString(36).substring(2);
    },
    filtered() {
      if (this.search) {
        let regex = new RegExp(this.searchValue);
        return this.options.filter(
          (item) => regex.test(item[this.oText]) || regex.test(item[this.oHint])
        );
      } else {
        return this.options;
      }
      // console.log(this.$refs.input);
    },
    placeHolderText() {
      if (this.modelValue.length > 1) {
        return this.someText || this.modelValue.length + " items";
      } else if (this.modelValue.length == 1) {
        return this.options.find((item) => item[this.oValue] == this.modelValue[0])[
          this.oText
        ];
      } else {
        return this.placeholder;
      }
    },
    selectedItems() {
      return this.options.filter((item) => this.modelValue.includes(item[this.oValue]));
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
    if (this.$refs.tags) {
      const resizeObserver = new ResizeObserver(
        (entries) => (this.tagsHeight = entries[0].target.clientHeight)
      );
      resizeObserver.observe(this.$refs.tags);
    }
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
      let array = this.toggleArray(this.modelValue, option[this.oValue]);
      this.$emit("update:modelValue", array);
    },
    toggleArray(list, value) {
      if (list.includes(value)) {
        return list.filter((item) => item != value);
      } else {
        return [...list, value];
      }
    },
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-multi-select {
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
        &:hover,
        &.mnr-hover {
          &:not(.mnr-disabled, .mnr-checked) {
            background-color: #eee;
            .mnr-select-frame {
              svg {
                fill: #4fc3f7;
              }
            }
          }
        }
        &.mnr-checked {
          .mnr-select-frame {
            background-color: #4fc3f7;
            border-color: #4fc3f7;
            box-shadow: 0 0 0 0.15em rgba(#4fc3f7, 0.5);
            svg {
              fill: #fbfbfb;
            }
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
      border-radius: 0.18em;
      border-style: solid;
      border-width: 0.15em;
      border-color: #dddddd;
      background-color: #fbfbfb;
      display: flex;
      position: relative;
      padding: 0.15em;
      margin-inline-end: 10px;
      svg {
        fill: #aaa;
      }
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
      .mnr-frame {
        background-color: #c8e6c9;
      }
    }
    &.mnr-status-warning {
      .mnr-box,
      .mnr-hint {
        color: #e65100;
      }
      .mnr-frame {
        background-color: #ffecb3;
      }
    }
    &.mnr-status-error {
      .mnr-box,
      .mnr-hint {
        color: #c62828;
      }
      .mnr-frame {
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
    .mnr-tag {
      display: inline-flex;
      align-items: center;
      border-radius: 1000px;
      border-style: solid;
      border-width: 1px;
      border-color: #dddddd;
      margin: 5px;
      padding: 3px;
      background-color: #fbfbfb;
      margin-inline-end: 0;
      margin-block-end: 0;
      cursor: pointer;

      &:hover {
        .mnr-tag-close {
          background-color: #e53935;
        }
      }
    }
    .mnr-tag-close {
      border-radius: 1000px;
      width: 1.5em;
      height: 1.5em;
      padding: 5px;
      display: flex;
      background-color: #ef5350;

      svg {
        fill: #fbfbfb;
      }
    }
    .mnr-tag-text {
      padding: 0 5px;
    }
  }
}
</style>
