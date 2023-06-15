<template>
  <div
    class="mnr-input mnr-text"
    :class="[
      {
        'mnr-hover': hover,
        'mnr-focus': focus,
        'mnr-disabled': disabled,
      },
      status ? 'mnr-status-' + status : '',
    ]"
  >
    <div class="mnr-title" v-if="title">
      <b>{{ title }}</b>
    </div>
    <div class="mnr-main" :dir="inputDir">
      <div class="mnr-frame" @mouseover="hover = true" @mouseout="hover = false">
        <div class="mnr-box">
          <div class="mnr-input-icon" v-if="$slots.default">
            <slot></slot>
          </div>
          <div class="mnr-input-before" v-if="before">{{ before }}</div>
          <input
            ref="input"
            type="number"
            :placeholder="placeholder"
            @focus="focus = true"
            @blur="hover ? $refs.input.focus() : (focus = false)"
            :disabled="disabled"
            :value="modelValue"
            :min="min"
            :max="max"
            :step="step"
            :readonly="readonly"
            @input="inputHandler($event.target.value)"
          />
          <div class="mnr-input-after" v-if="after">{{ after }}</div>
          <div class="mnr-status-icon" v-if="status">
            <component :is="'mnr-icon-' + status" />
          </div>
          <div class="mnr-input-spinner" v-if="loading">
            <MnrSpinner />
          </div>
          <div
            class="mnr-num-box"
            :class="{ 'mnr-small-btn': smallCounter }"
            v-if="counter"
          >
            <div class="mnr-num-btn" @click="inputHandler(modelValue + step)">
              <svg viewBox="0 0 100 100">
                <path
                  d="M88 38c6,0 12,5 12,12 0,6 -4,11 -10,12l-2 0 -27 0 0 27c0,6 -5,12 -12,12 -6,0 -11,-4 -12,-10l0 -2 0 -27 -27 0c-6,0 -12,-5 -12,-12 0,-6 4,-11 10,-12l2 0 27 0 0 -27c0,-6 5,-12 12,-12 6,0 11,4 12,10l0 2 0 27 27 0z"
                />
              </svg>
            </div>
            <div class="mnr-num-btn" @click="inputHandler(modelValue - step)">
              <svg viewBox="0 0 100 100">
                <path
                  d="M100 50c0,-5.94 -4.95,-11.88 -11.88,-11.88l-76.24 0 -1.98 0c-5.94,0.99 -9.9,5.94 -9.9,11.88 0,5.94 4.95,11.88 11.88,11.88l76.24 0 1.98 0c5.94,-0.99 9.9,-5.94 9.9,-11.88z"
                />
              </svg>
            </div>
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
      type: [Number, null],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Boolean,
      default: true,
    },
    smallCounter: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY,
    },
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY,
    },
    step: {
      type: Number,
      default: 1,
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
    inputDir: {
      type: String,
      default: "ltr",
    },
    before: {
      type: String,
      default: "",
    },
    after: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      focus: false,
      hover: false,
      // filteredOptions: this.options,
    };
  },
  methods: {
    inputHandler(number) {
      if (!this.disabled) {
        if (number === "") {
          this.$emit("update:modelValue", null);
        } else {
          number = Number(number);
          if (number > this.max) {
            number = this.max;
          }
          if (number < this.min) {
            number = this.min;
          }
          if (number != this.modelValue) {
            this.$emit("update:modelValue", number);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-text {
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
      height: 100%;
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
    .mnr-box {
      display: flex;
      height: 2.9rem;

      input {
        display: block;
        height: 100%;
        width: 100%;
        padding: 0 10px;
        cursor: unset;
        outline: none;
        color: inherit;
        min-width: 1px;
        flex-shrink: 100;
        -moz-appearance: textfield;
        &::placeholder {
          color: #aaaaaa;
          opacity: 1;
        }
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
      .mnr-input-before,
      .mnr-input-after {
        white-space: nowrap;
        display: flex;
        height: 100%;
        padding: 0.5em;
        color: #666;
        align-items: center;
        &.mnr-input-before {
          padding-inline-end: 0;
        }
        &.mnr-input-after {
          padding-inline-start: 0;
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
      .mnr-num-box {
        display: flex;
        gap: 0.2em;
        padding-inline-end: 0.2em;
        flex-flow: row-reverse;

        .mnr-num-btn {
          width: 1.8em;
          display: flex;
          height: 100%;
          align-items: center;
          cursor: pointer;
          svg {
            border-radius: 1000px;
            background-color: #fbfbfb;
            border: solid #ddd 1px;
            padding: 0.5em;
            fill: #666;
          }
          &:hover svg {
            background-color: #eee;
          }
        }
        &.mnr-small-btn {
          height: 2.9rem;
          flex-flow: column;
          align-items: flex-end;
          padding: 2px;

          .mnr-num-btn {
            width: auto;
            display: block;
            flex: 1;
            height: 1.25em;
            svg {
              height: 100%;
              padding: 0.25em;
            }
          }
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
      .mnr-box {
        background-color: #e8f5e9;
      }
    }
    &.mnr-status-warning {
      .mnr-box,
      .mnr-hint {
        color: #e65100;
      }
      .mnr-box {
        background-color: #fff8e1;
      }
    }
    &.mnr-status-error {
      .mnr-box,
      .mnr-hint {
        color: #c62828;
      }
      .mnr-box {
        background-color: #ffebee;
      }
    }
  }
}
</style>
