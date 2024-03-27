<template lang="pug">
.aff-service-title(:style="`--main-color: ${color || ''}`")
    SrIcon(:name="icon" v-if="icon")
    SrText(:text="title" class="title")

    SrIcon.bg(name="starBg_i")
</template>

<script lang="ts">
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.aff-service-title {
  --main-color: $color-aff-gray;
  display: flex;
  width: 100%;
  align-self: flex-start;
  align-items: center;

  .sr-text {
    &.title {
      font-size: pxToRem(40) !important;
    }
  }

  .sr-icon {
    width: pxToRem(70);
    height: pxToRem(70);
    margin-right: pxToRem(20);
    color: var(--main-color);
  }

  .bg {
    margin-left: auto;
    width: pxToRem(200);
    height: pxToRem(100);
    color: var(--main-color);
  }
}
</style>
