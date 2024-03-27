<template lang="pug">
.aff-mill-list
  SrText.aff-mill-list-title(:value="title" v-if="title")
  SrGrid.aff-mill-list-list(tag="ul")
    SrGridColumn(:size="{mobile: '1'}")
      SrText.aff-mill-list-title(:text="list.label")
    SrGridColumn.aff-mill-list-item(:size="{mobile: '1/2', sm: '1/4'}" v-for="(item, i) in list.items" :key="i")
      SrPicture(:src="item.thumb")
      SrText(v-if="item.title != 'Null'" :text="item.title" class="center")
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  list: {
    type: Object,
    default: () => ({
      label: "",
      items: [],
    }),
  },
});
</script>

<style lang="scss">
.aff-mill-list {
  &-title {
    width: auto;
    align-self: flex-start;
    min-width: pxToRem(100);
    text-align: center !important;
    padding: pxToRem(10);
    color: $color-aff-blue;
    font-family: aeromatics, sans-serif !important;
    font-size: pxToRem(30) !important;
    font-weight: bold;
    font-style: italic;
    .sr-text-container {
      text-align: inherit;
    }
  }

  &-item {
    .sr-picture {
      margin-bottom: pxToRem(10);
    }
    .sr-text {
      margin-top: auto;
      &-container {
        text-align: center;
        font-style: italic;
      }
    }
  }
}
</style>
