<template lang="pug">
ul.aff-checklist
  li.aff-checklist-item(v-for="(item, i) in items" :key="i")
    SrIcon(:name="icon")
    SrText(:text="item")
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: String,
    default: "check-f",
  },
});
</script>

<style lang="scss">
.aff-checklist {
  list-style: none;
  padding-left: 0;

  &-item {
    display: flex;
    align-items: center;
    margin-bottom: pxToRem(10);
    padding-top: pxToRem(10);
    padding-bottom: pxToRem(10);

    .sr-icon {
      width: pxToRem(20);
      height: pxToRem(20);
      margin-right: pxToRem(10);
      color: $color-aff-blue;
    }

    .sr-text {
      margin-bottom: 0;
    }
  }
}
</style>
