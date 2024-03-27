<template lang="pug">
.aff-color-preview
    .aff-color-preview__color(:style="`--color: ${color}`")
    .aff-color-preview__name {{ name }}
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.aff-color-preview {
  margin-bottom: pxToRem(10);
  width: 100%;
  &__color {
    width: 100%;
    height: pxToRem(80);
    border-radius: pxToRem(4);
    margin-bottom: pxToRem(10);
    background-color: var(--color);
  }

  &__name {
    font-size: pxToRem(18);
    font-weight: bold;
    color: $color-aff-gray;
  }
}
</style>
