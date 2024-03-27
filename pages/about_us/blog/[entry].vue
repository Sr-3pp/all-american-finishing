<template lang="pug">
SrContainer.aff-entry(:with-padding="true")
    SrPicture.aff-entry-banner(:src="entry.banner")
    .aff-entry-title
        SrText(:value="entry.title" kind="title")
        SrText(:value="entry.created_at")
    .aff-entry-content
        Component(
            v-for="(item, i) in entry.content"
            :is="item.component"
            v-bind="item.props"
            :key="i"
        )
</template>

<script lang="ts" setup>
import type { Entry } from "~/types";

const route = useRoute();
const entry_id = route.params.entry;

const { data: entry }: any = await $fetch("/api/blog/" + entry_id);
</script>

<style lang="scss">
.aff-entry {
  box-shadow: 0 0 pxToRem(20) rgba($color-black, 0.5);

  &.sr-container {
    padding-top: 0 !important;
  }

  &-banner {
    &.sr-picture {
      margin-bottom: pxToRem(20);
    }
  }
  &-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: pxToRem(20);
    padding-left: pxToRem(20);
    padding-right: pxToRem(20);
  }
  &-content {
    padding-left: pxToRem(20);
    padding-right: pxToRem(20);
    .sr-text {
      &:not(:last-child) {
        margin-bottom: pxToRem(20);
      }
    }
  }
}
</style>
