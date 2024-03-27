<template lang="pug">
.aff-material-description
  .aff-material-description-content 
    .aff-material-description-name
      SrIcon(name="tubes-o")
      SrText(:text="title" class="title")
    SrText(:text="description")
  SrPicture(:src="image")
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.aff-material-description {
  display: flex;
  &:not(:last-child) {
    margin-bottom: pxToRem(50);
    border-bottom: {
      style: solid;
      color: $color-aff-gray;
      width: pxToRem(1);
    }
  }
  &-name {
    display: flex;
    align-items: center;
    color: $color-aff-blue;
    margin-bottom: pxToRem(20);

    .sr-text {
      color: currentColor;
    }
    .sr-icon {
      color: currentColor;
      width: pxToRem(50);
      height: pxToRem(50);
      margin-right: pxToRem(10);
    }
  }

  .sr-picture {
    width: 20%;
    min-width: pxToRem(160);
    flex-shrink: 0;
  }
}
</style>
