<template lang="pug">
.aff-patina-list
  SrText.aff-patina-list-title(:value="title" kind="title")
  SrGrid.aff-patina-list-list(tag="ul")
    li.aff-patina-list-list-item(class="sr-grid-col-1 sm:sr-grid-col-1/3 column" v-for="(item, i) in items" :key="i")
      SrText.aff-patina-list-list-item-title(:value="item.name")
      SrText(:text="getBaseMaterial(item.baseMaterial)")
      SrPicture(:src="item.thumb" :alt="item.name")
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const getBaseMaterial = (baseMaterial: string) => {
  `<span class='label'>Base Material</span> <br>${baseMaterial}`;
};
</script>

<style lang="scss">
.aff-patina-list {
  &-title {
    margin-bottom: pxToRem(20);
    color: $color-aff-gray;
  }
  &-list {
    list-style: none;
    padding-left: 0;
    margin-bottom: pxToRem(20);
    &-item {
      padding: pxToRem(20) !important;
      border-right: {
        style: solid;
        color: $color-aff-gray;
        width: pxToRem(1);
      }
      &:nth-child(3n) {
        border: none;
      }

      &-title {
        font-size: pxToRem(20) !important;
        color: $color-aff-gray;
        font-weight: bold;
        margin-bottom: pxToRem(10);
      }
      .sr-text {
        font-size: pxToRem(14);
        text-transform: capitalize;
        margin-bottom: pxToRem(20);
        .label {
          font-size: pxToRem(20) !important;
          color: $color-aff-gray;
          font-weight: bold;
        }
      }
      .sr-img {
        width: 100%;
        max-width: pxToRem(320);
        margin-top: auto;
      }
    }
  }
}
</style>
