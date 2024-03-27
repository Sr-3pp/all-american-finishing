<template lang="pug">
.aff-finish-card
  SrPicture(:src="img")
  .aff-finish-card-content
      SrText.aff-finish-card-title(:text="title" class="subtitle text-center")
      SrText.aff-finish-card-material(:text="material" class="text-center")
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  material: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.aff-finish-card {
  padding: pxToRem(10);
  display: flex;
  flex-direction: column;
  .sr-img {
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: pxToRem(20);
  }

  &-title {
    margin-bottom: pxToRem(10);
    color: $color-aff-red;
    padding: pxToRem(4) pxToRem(10);
    border: {
      style: solid;
      color: currentColor;
      width: pxToRem(1);
      radius: pxToRem(8);
    }
    width: 100%;
  }
}
</style>
