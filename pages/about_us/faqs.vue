<script lang="ts" setup>
import { colorAffBlue } from "~/assets/ts/tokens";
import { queryContent } from "~/assets/ts/content";

const { content } = await queryContent("about_us/faqs");
console.log(content);
defineProps({
  faqs: {
    type: Array,
    default: () => [],
  },
});

definePageMeta({
  layout: "submenu",
});
</script>

<template lang="pug">
.faqs
  ServiceTitle(title="FAQ list" :style="`--main-color: ${colorAffBlue}`")
  component(v-for="(item, i) in content" :key="i" :is="item.component" v-bind="item.props")
</template>

<style lang="scss">
.faqs {
  .sr-grid {
    [class*="sr-grid-col-"] {
      .sr-text {
        margin-bottom: pxToRem(20);
      }
    }
  }
}
</style>
