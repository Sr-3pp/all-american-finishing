<script lang="ts" setup>
defineProps({
  questions: {
    type: Array,
    default: () => [],
  },
});
</script>

<template lang="pug">
ul.faq-list
  li.faq-list-item(v-for="(faq, i) in questions" :key="i")
    SrText(:text="faq.question" class="subtitle")
    SrText(:text="faq.answer" )
</template>

<style lang="scss" scoped>
.faq-list {
  &-item {
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);

    .sr-text {
      &.subtitle {
        margin-bottom: pxToRem(10);
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color-black;
    }
  }
}
</style>
