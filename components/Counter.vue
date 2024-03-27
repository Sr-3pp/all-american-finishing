<template lang="pug">
.aff-counter
    SrText.aff-counter-label(:text="label") 
    span.aff-counter-number {{ value }}   
</template>

<script lang="ts">
export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const value: number = this.start;
    const is_visible: any = useElementVisibility(this.$el);
    const counts: any = null;
    return {
      value,
      is_visible,
      counts,
    };
  },
  onMounted() {
    this.counts = setInterval(this.startCount);
  },
  methods: {
    startCount() {
      this.value++;
      if (this.value == this.end) {
        clearInterval(this.counts);
      }
    },
  },
  watch: {
    is_visible: {
      handler(sw: any) {
        if (sw) {
          this.startCount();
        }
      },
    },
  },
});
</script>

<style lang="scss">
.aff-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-label {
    --text-align: center;
    margin: auto;
    &.sr-text {
      font-style: italic;
      font-size: pxToRem(30) !important;
      font-weight: bold;
      margin-bottom: pxToRem(10) !important;
      font-family: aeromatics;
    }
  }

  &-number {
    color: currentColor;
    font-size: pxToRem(60);
    font-family: aeromatics;
    font-style: italic;
    font-weight: bold;
  }
}
</style>
