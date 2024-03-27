<template lang="pug">
component(v-for="(item, i) in content" :key="i" :is="item.component" v-bind="item.props")
</template>

<script lang="ts" setup>
import { queryContent } from "~/assets/ts/content";

const { content } = await queryContent("about_us/index");
</script>

<style lang="scss">
.about {
  &_1 {
    .sr-text {
      margin-bottom: pxToRem(20);

      &.title {
        margin-bottom: pxToRem(40);
      }
    }
  }
  &_2 {
    background-color: $color-aff-blue;

    .sr-text {
      color: $color-white;
    }

    .aff-counter {
      margin-left: auto;
      margin-right: auto;
      &-label {
        &.sr-text {
          &.kind {
            &-text {
              font-size: pxToRem(40);
              font-weight: bold;
              text-transform: capitalize;
            }
          }
        }
      }
      &-number {
        color: $color-white;
      }
    }
  }
  &_3,
  &_5 {
    .sr-grid {
      [class*="sr-grid-col-"] {
        --justify-content: center;
      }

      .sr-text {
        margin-bottom: 0;
      }
    }

    .sr-text {
      margin-bottom: pxToRem(20);

      &.title {
        margin-bottom: pxToRem(40);
      }
    }
  }

  &_4 {
    background-color: $color-aff-red;
    .sr-text {
      color: $color-white;
    }
  }
}
</style>
