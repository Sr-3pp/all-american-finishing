<template lang="pug">
.aff-service
    ServiceTitle(:style="`--main-color: ${service.color}`" :title="service.name" :icon="service.icon")
    SrText.aff-service-description(:value="service.description")
    SrGrid(tag="ul")
        li.sr-grid-col-1(class="sr-grid-col-1/2" v-for="(item, i) in service.items" :key="i")
            NuxtLink(:to="`/services/${service.name.toLowerCase().replace(/ /g, '_')}/${item.name.toLowerCase().replace(/ /g, '_').replace(/#/g, '')}`")
                ServiceCard(v-bind="item" :style="`--hover-color: ${service.color}`")
    ServiceDetail(:items="service.details")
</template>

<script lang="ts" setup>
import { queryContent } from "~/assets/ts/content";

definePageMeta({
  layout: "submenu",
});
const { fullPath } = useRoute();
const promises = await Promise.all([queryContent(fullPath + "/index")]);
const service = promises[0];
service.items = await $fetch("/api/get-folder-contents?section=" + fullPath);
</script>

<style lang="scss">
.aff-service {
  &-title,
  &-description {
    margin-bottom: pxToRem(40);
  }

  .sr-grid {
    margin-bottom: pxToRem(40);
    [class*="sr-grid-col-"] {
      > a {
        display: flex;
        height: 100%;
      }
    }
  }
}
</style>
