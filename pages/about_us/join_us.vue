<template lang="pug">
.join-us
    component(v-for="(item, i) in content" :key="i" :is="item.component" v-bind="item.props")
</template>

<script lang="ts" setup>
import { queryContent } from "~/assets/ts/content";

const { content } = await queryContent("about_us/join_us");
console.log(content);

definePageMeta({
  layout: "submenu",
});
</script>

<style lang="scss">
.join-us {
  > * {
    &:not(:last-child) {
      margin-bottom: pxToRem(40);
    }
  }

  .sr-grid {
    [class*="sr-grid-col-"] {
      --justify-content: center;
    }
  }
}
</style>
