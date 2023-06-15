<template>
  <label
    class="mnr-input mnr-checkbox"
    :class="[
      {
        'mnr-checked': isChecked,
        'mnr-focus': focus,
        'mnr-disabled': disabled,
      },
      status ? 'mnr-status-' + status : '',
    ]"
  >
    <input
      ref="input"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @input="onInput"
      @focus="focus = true"
      @blur="focus = false"
      :disabled="disabled || loading"
    />
    <span class="mnr-frame">
      <svg viewBox="0 0 100 100" class="mnr-key">
        <path
          d="M36 65l-21 -21 -1 -1c-3,-3 -8,-2 -11,1 -3,3 -3,9 0,12l28 28 1 1c3,3 8,2 11,-1l55 -55 1 -1c3,-3 2,-8 -1,-11 -3,-3 -9,-3 -12,0l-49 49z"
        />
      </svg>
    </span>
    <span class="mnr-input-spinner" v-if="loading">
      <MnrSpinner />
    </span>
    <span class="mnr-text"><slot></slot></span>
  </label>
</template>

<script>
import MnrSpinner from "./MnrSpinner.vue";

export default {
  components: {
    MnrSpinner,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    checked: {
      type: [Boolean, Number],
      default: false,
    },
    value: null,
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      focus: false,
    };
  },
  computed: {
    isChecked() {
      return this.checked || this.list.includes(this.value);
    },
  },
  mounted() {
    if (this.checked) {
      this.$emit("update:modelValue", this.value);
    } else {
      this.$emit("update:modelValue", "");
    }
  },
  methods: {
    onInput(e) {
      this.$emit("update:checked", e.target.checked);
      if (e.target.checked) {
        this.$emit("update:list", [...this.list, e.target.value]);
        this.$emit("update:modelValue", e.target.value);
      } else {
        this.$emit(
          "update:list",
          this.list.filter((item) => item != e.target.value)
        );
        this.$emit("update:modelValue", "");
      }
    },
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-checkbox {
    display: inline-flex;
    align-items: center;
    height: 2.9rem;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    // background-color: red;
    &.mnr-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .mnr-frame {
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
    }
    .mnr-key {
      fill: #aaaaaa;
    }
    &.mnr-checked {
      .mnr-frame {
        background-color: #4fc3f7;
        border-color: #4fc3f7;
        box-shadow: 0 0 0 0.15em rgba(#4fc3f7, 0.5);
      }
      .mnr-key {
        fill: #fbfbfb;
      }
      &.mnr-status-accepted {
        .mnr-frame {
          background-color: #4caf50;
          border-color: #4caf50;
          box-shadow: 0 0 0 0.15em rgba(#4caf50, 0.5);
        }
      }
      &.mnr-status-warning {
        .mnr-frame {
          background-color: #ffc107;
          border-color: #ffc107;
          box-shadow: 0 0 0 0.15em rgba(#ffc107, 0.5);
        }
      }
      &.mnr-status-error {
        .mnr-frame {
          background-color: #f44336;
          border-color: #f44336;
          box-shadow: 0 0 0 0.15em rgba(#f44336, 0.5);
        }
      }
    }
    &:hover:not(.mnr-disabled),
    &.mnr-focus:not(.mnr-disabled) {
      &:not(.mnr-checked) {
        .mnr-key {
          fill: #4fc3f7;
        }
        &.mnr-status-accepted {
          .mnr-key {
            fill: #4caf50;
          }
        }
        &.mnr-status-warning {
          .mnr-key {
            fill: #ffc107;
          }
        }
        &.mnr-status-error {
          .mnr-key {
            fill: #f44336;
          }
        }
      }
      &.mnr-checked {
        .mnr-frame {
          box-shadow: none;
        }
      }
    }
    .mnr-text {
      margin: 0 10px;
    }
    .mnr-input-spinner {
      display: flex;
      height: 100%;
      padding: 0.5em;
      color: #666;
      width: 2.2em;
      &.mnr-input-spinner {
        padding: 0 0.7em;
        padding-inline-end: 0;
      }
      svg {
        fill: currentColor;
      }
    }
  }
}
</style>
