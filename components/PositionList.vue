<script lang="ts" setup>
defineProps({
  positions: {
    type: Array,
    default: () => [],
  },
});
</script>

<template lang="pug">
ul.aff-position-list
  li.aff-position-list-item(v-for="(position, i) in positions" :key="i")
    SrText(:text="position.title" class="subtitle")
</template>

<style lang="scss" scoped>
.aff-position-list {
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: 33.33333%;
    padding: pxToRem(10);
  }
}
</style>
