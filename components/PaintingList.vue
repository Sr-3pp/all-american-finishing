<template lang="pug">
SrGrid.aff-painting-list(tag="ul")
  li.aff-painting-list-item(class="sr-grid-col-1 sm:sr-grid-col-1/4 column" v-for="(item, i) in items" :key="i")
    .aff-painting-specs
      template(v-for="([key, value], j) in Object.entries(item)" :key="j")
        SrText(v-if="key && key !== 'thumb'" :key="j" :text="getPaintingSpecs(key, value)")
    SrPicture.aff-painting-img(:src="item.thumb" :alt="`${name} ${item.code}}`")
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const getPaintingSpecs = (key: string, value: string) =>
  `<span class='label'>${key.replace(/_/g, " ")}:</span> ${value}`;
</script>

<style lang="scss">
.aff-painting-list {
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
    &:nth-child(4n) {
      border: none;
    }
    .aff-painting-specs {
      display: flex;
      flex-direction: column;
      margin-bottom: pxToRem(20);
      width: 100%;

      .sr-text {
        font-size: pxToRem(14);
        text-transform: capitalize;
        margin-bottom: pxToRem(5);

        .label {
          color: $color-aff-gray;
          font-weight: bold;
        }
      }
    }

    .aff-painting-img {
      width: 100%;
      max-width: pxToRem(320);
      margin-top: auto;
    }
  }
}
</style>
