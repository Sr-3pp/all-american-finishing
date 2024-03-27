<template lang="pug">
section.aff-services
    SrGrid.service-list(tag="ul")
        li.service-list-item(class="sr-grid-col-1 sm:sr-grid-col-1/2" v-for="(service, i) in services" :key="i")
            NuxtLink(:to="`/services/${service.name.replace(/ /g, '_').toLowerCase()}`")
                ServiceCard(v-bind="{...service, description: ''}" :style="`--hover-color: ${service.color}`")
    component(v-for="(item, i) in content" :key="i" :is="item.component" v-bind="item.props")
</template>

<script lang="ts" setup>
import { queryContent } from "~/assets/ts/content";

definePageMeta({
  layout: "submenu",
});
const promises = await Promise.all([
  useFetch("/api/get-folder-contents?section=services"),
  queryContent("services/index"),
]);
const { data: services } = promises[0];

const { content } = promises[1];
</script>

<style lang="scss">
.aff-services {
  .service-list {
    margin-bottom: pxToRem(40);

    &-item {
      > * {
        width: 100%;
      }
    }
  }

  .sr-text {
    &.kind {
      &-title {
        margin-bottom: pxToRem(20);
      }
    }
  }
}
</style>
