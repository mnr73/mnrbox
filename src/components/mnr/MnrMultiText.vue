<template>
  <div
    class="mnr-input mnr-multi-text"
    :class="[
      {
        'mnr-hover': hover,
        'mnr-focus': focus,
        'mnr-open-list': openList,
        'mnr-disabled': disabled,
      },
      status ? 'mnr-status-' + status : '',
    ]"
  >
    <div class="mnr-title" v-if="title">
      <b>{{ title }}</b>
    </div>
    <div
      class="mnr-main"
      :dir="inputDir"
      :style="{
        height: 'calc(2.9rem + ' + tagsHeight + 'px)',
      }"
    >
      <div class="mnr-frame" @mouseover="hover = true" @mouseout="hover = false">
        <div class="mnr-tags" ref="tags" v-show="modelValue.length > 0">
          <div
            class="mnr-tag"
            v-for="(tag, index) in modelValue"
            :key="index"
            @click="tagHandler(index, true)"
          >
            <div class="mnr-tag-close" @click.stop="tagHandler(index, false)">
              <svg viewBox="0 0 100 100" class="mnr-close-icon">
                <path
                  d="M8 8c4,-4 10,-4 14,-1l1 1 27 27 27 -27c4,-4 11,-4 15,0 4,4 4,10 1,14l-1 1 -27 27 27 27c4,4 4,11 0,15 -4,4 -10,4 -14,1l-1 -1 -27 -27 -27 27c-4,4 -11,4 -15,0 -4,-4 -4,-10 -1,-14l1 -1 27 -27 -27 -27c-4,-4 -4,-11 0,-15z"
                />
              </svg>
              <svg viewBox="0 0 500 500" class="mnr-edit-icon">
                <path
                  d="M482 450l-191 0 -3 0c-9,1 -16,9 -16,18 0,10 8,18 18,18l191 0 2 0c9,-1 16,-9 16,-18 0,-10 -8,-18 -18,-18zm-294 12l270 -265c35,-34 35,-89 0,-123l-36 -35c-35,-34 -91,-34 -125,0l-269 264c-15,15 -24,34 -24,55l-3 109c0,10 8,18 18,18l111 0c22,0 43,-8 58,-24zm198 -244l-223 219 -3 3c-8,7 -19,10 -29,10l-92 0 2 -91c0,-11 5,-22 13,-31l222 -218 110 107zm26 -25l-110 -107 21 -20c20,-20 53,-20 74,0l36 35c20,20 20,52 0,72l-21 20z"
                />
              </svg>
            </div>
            <div class="mnr-tag-text">
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="mnr-box">
          <div class="mnr-input-icon" v-if="$slots.default">
            <slot></slot>
          </div>
          <input
            ref="input"
            type="text"
            :placeholder="placeholder"
            @focus="focus = true"
            @blur="hover ? $refs.input.focus() : (focus = false)"
            :disabled="disabled"
            @keyup="inputHandler"
          />
          <div class="mnr-status-icon" v-if="status">
            <component :is="'mnr-icon-' + status" />
          </div>
          <div class="mnr-input-spinner" v-if="loading">
            <MnrSpinner />
          </div>
        </div>
        <div class="mnr-options" v-if="options.length > 0" v-show="openList">
          <div
            class="mnr-option"
            v-for="option in filtered"
            :key="option"
            @click="$emit('update:modelValue', [...modelValue, option])"
          >
            <div class="mnr-option-icon" @click.stop="$refs.input.value = option">
              <svg viewBox="0 0 500 500">
                <path
                  d="M482 450l-191 0 -3 0c-9,1 -16,9 -16,18 0,10 8,18 18,18l191 0 2 0c9,-1 16,-9 16,-18 0,-10 -8,-18 -18,-18zm-294 12l270 -265c35,-34 35,-89 0,-123l-36 -35c-35,-34 -91,-34 -125,0l-269 264c-15,15 -24,34 -24,55l-3 109c0,10 8,18 18,18l111 0c22,0 43,-8 58,-24zm198 -244l-223 219 -3 3c-8,7 -19,10 -29,10l-92 0 2 -91c0,-11 5,-22 13,-31l222 -218 110 107zm26 -25l-110 -107 21 -20c20,-20 53,-20 74,0l36 35c20,20 20,52 0,72l-21 20z"
                />
              </svg>
            </div>
            <span>{{ option }}</span>
          </div>
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
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
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
    duplicate: {
      type: Boolean,
      default: false,
    },
    splitter: {
      type: Array,
      default() {
        return [",", ","];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
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
      tagsHeight: 0,
      value: "",
      emptyValue: 0,
      // filteredOptions: this.options,
    };
  },
  computed: {
    openList() {
      return this.focus && this.options.length > 0;
    },
    filtered() {
      let regex = new RegExp(this.value);
      return this.options.filter(
        (item) =>
          regex.test(item) && item != this.value && !this.modelValue.includes(item)
      );
    },
    getSplitterRegex() {
      return new RegExp("\n|\r|" + this.splitter.join("|") || "", "gi");
    },
  },
  mounted() {
    if (this.$refs.tags) {
      const resizeObserver = new ResizeObserver(
        (entries) => (this.tagsHeight = entries[0].target.clientHeight)
      );
      resizeObserver.observe(this.$refs.tags);
    }
  },
  methods: {
    inputHandler(e) {
      this.value = e.target.value;

      if (e.key == "Enter" || this.getSplitterRegex.test(e.target.value)) {
        if (e.target.value) {
          this.emptyValue = 0;
          let regex = this.getSplitterRegex;
          let values = e.target.value.split(regex);
          let array = [...this.modelValue, ...values];
          if (!this.duplicate) {
            array = [...new Set(array)];
          }
          e.target.value = "";
          this.$emit("update:modelValue", array.filter(String));
        }
      } else if (e.keyCode == 8 && this.modelValue.length > 0) {
        if (e.target.value.length == 0) {
          if (this.emptyValue == 0) {
            let array = this.modelValue;
            e.target.value = array.pop();
            this.$emit("update:modelValue", array.filter(String));
            this.emptyValue = 1;
          } else {
            this.emptyValue--;
          }
        }
      } else {
        this.emptyValue = 1;
      }
    },
    tagHandler(index, edit) {
      let array = this.modelValue;
      let deleted = array.splice(index, 1);
      this.$emit("update:modelValue", array);
      if (edit) {
        this.$refs.input.value = deleted[0];
      }
    },
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-multi-text {
    input {
      font-family: inherit;
      font-size: 1.1em;
      border: none;
      background-color: rgba(0, 0, 0, 0);
    }
    &.mnr-disabled {
      cursor: not-allowed;
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
      background-color: #fbfbfb;
      border-color: #dddddd;
      color: #666;
      overflow: hidden;
    }
    &.mnr-hover:not(.mnr-disabled, .mnr-focus) .mnr-frame {
      border-color: #4fc3f7;
    }
    &.mnr-focus .mnr-frame {
      border-color: #039be5;
      box-shadow: 0 0 0 3px rgba(#039be5, 0.2);
    }
    &.mnr-open-list .mnr-frame {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 70;
      height: auto;
      width: 100%;
    }
    .mnr-box {
      display: flex;
      height: 2.9rem;

      input {
        display: block;
        width: 100%;
        padding: 0 10px;
        cursor: unset;
        outline: none;
        color: inherit;
        min-width: 1px;
        flex-shrink: 100;
        &::placeholder {
          color: #aaaaaa;
          opacity: 1;
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
        background-color: #e8f5e9;
      }
    }
    &.mnr-status-warning {
      .mnr-box,
      .mnr-hint {
        color: #e65100;
      }
      .mnr-frame {
        background-color: #fff8e1;
      }
    }
    &.mnr-status-error {
      .mnr-box,
      .mnr-hint {
        color: #c62828;
      }
      .mnr-frame {
        background-color: #ffebee;
      }
    }
    .mnr-options {
      .mnr-option-icon {
        width: 1.5em;
        height: 1.5em;
        padding: 0.3em;
        display: flex;
        border-radius: 1000px;
        background-color: #29b6f6;
        margin-inline-end: 0.5em;
        svg {
          fill: #fbfbfb;
        }
        &:hover {
          background-color: #039be5;
        }
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
      & .mnr-edit-icon {
        display: none;
      }
      &:hover {
        .mnr-tag-close {
          background-color: #039be5;
          & .mnr-edit-icon {
            display: block;
          }
          & .mnr-close-icon {
            display: none;
          }
          &:hover {
            background-color: #e53935;
            & .mnr-edit-icon {
              display: none;
            }
            & .mnr-close-icon {
              display: block;
            }
          }
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
