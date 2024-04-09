<template lang="pug">
.aff-counter
    SrText.aff-counter-label(:text="label") 
    span.aff-counter-number(ref="counterEl") {{ value }}   
</template>

<script lang="ts" setup>
const props = defineProps({
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
});

const counterEl: Ref<HTMLElement | null> = ref(null);
const value: Ref<number> = ref(props.start);
const scrolled: Ref<any> = ref(useWindowScroll());
const counting = ref(false);

const startCount: any = () => {
  if (props.end.toString().length > 3) {
    value.value += 150;
  } else if (props.end.toString().length > 2) {
    value.value += 50;
  } else {
    value.value++;
  }
  if (value.value >= props.end) {
    clearInterval(counts.value);
    counting.value = false;
  }
};
const counts: Ref<any> = ref(null);

const initInterval: any = () => {
  counting.value = true;
  counts.value = setInterval(startCount, 80);
};

watch(
  () => scrolled.value.y,
  () => {
    const sw = useElementVisibility(counterEl).value;
    if (sw && value.value < props.end && !counting.value) {
      initInterval();
    } else if (!sw && !counting.value) {
      clearInterval(counts.value);
      counting.value = false;
      value.value = 0;
    }
  }
);
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
      font-size: pxToRem(20) !important;
      font-weight: bold;
      margin-bottom: pxToRem(10) !important;
      font-family: aeromatics;

      @media (min-width: $breakpoint-sm) {
        font-size: pxToRem(30) !important;
      }
    }
  }

  &-number {
    color: currentColor;
    font-size: pxToRem(30);
    font-family: aeromatics;
    font-style: italic;
    font-weight: bold;
    @media (min-width: $breakpoint-sm) {
      font-size: pxToRem(40);
    }
  }
}
</style>
