<template>
  <label
    class="mnr-input mnr-check-slider"
    :class="[
      {
        'mnr-checked': isChecked,
        'mnr-focus': focus,
        'mnr-disabled': disabled
      },
      status ? 'mnr-status-' + status : ''
    ]"
  >
    <input
      ref="input"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      :disabled="disabled || loading"
      @input="onInput"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span class="mnr-frame">
      <span class="mnr-key"></span>
    </span>
    <span v-if="loading" class="mnr-input-spinner">
      <MnrSpinner />
    </span>
    <span class="mnr-text"><slot></slot></span>
  </label>
</template>

<script>
import MnrSpinner from "./MnrSpinner.vue";

export default {
  components: {
    MnrSpinner
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    checked: {
      type: [Boolean, Number],
      default: false
    },
    value: null,
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      focus: false
    };
  },
  computed: {
    isChecked() {
      return this.checked || this.list.includes(this.value);
    }
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
    }
  }
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-check-slider {
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
      width: 2.7em;
      height: 1.5em;
      border-radius: 1000px;
      border-style: solid;
      border-width: 0.15em;
      border-color: #dddddd;
      background-color: #fbfbfb;
      display: block;
      position: relative;
      flex-shrink: 0;
    }
    .mnr-key {
      height: 1.5em;
      width: 1.5em;
      position: absolute;
      top: -0.15em;
      left: -0.15em;
      border-radius: 1000px;
      background-color: #aaaaaa;
      transition: left 0.3s;
    }
    &.mnr-checked {
      .mnr-frame {
        background-color: #e1f5fe;
      }
      .mnr-key {
        left: calc(1.2em - 0.15em);
        background-color: #4fc3f7;
        box-shadow: 0 0 0 0.25em rgba(#4fc3f7, 0.5);
      }
      &.mnr-status-accepted {
        .mnr-frame {
          background-color: #e8f5e9;
        }
        .mnr-key {
          background-color: #4caf50;
          box-shadow: 0 0 0 0.25em rgba(#4caf50, 0.5);
        }
      }
      &.mnr-status-warning {
        .mnr-frame {
          background-color: #fff8e1;
        }
        .mnr-key {
          background-color: #ffc107;
          box-shadow: 0 0 0 0.25em rgba(#ffc107, 0.5);
        }
      }
      &.mnr-status-error {
        .mnr-frame {
          background-color: #ffebee;
        }
        .mnr-key {
          background-color: #f44336;
          box-shadow: 0 0 0 0.25em rgba(#f44336, 0.5);
        }
      }
    }
    &:hover:not(.mnr-disabled),
    &.mnr-focus:not(.mnr-disabled) {
      .mnr-key {
        box-shadow: 0 0 0 0.25em rgba(#aaa, 0.5);
      }
    }
    .mnr-text {
      margin: 0 10px;
      display: block;
      width: 100%;
    }
    .mnr-input-spinner {
      display: flex;
      flex-shrink: 0;
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
