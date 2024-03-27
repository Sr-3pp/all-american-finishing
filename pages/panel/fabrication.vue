<script lang="ts" setup>
definePageMeta({
  layout: "panel",
});

const fabrications = ref([]);
</script>

<template lang="pug">
.aff-fabrication
  SrContainer(:with-padding="true")
    .aff-fabrication-header
      SrText(class="title") Fabrication
    AafTable(:data="fabrications" :hiddeButtons="['edit']")
</template>

<style scoped></style>
