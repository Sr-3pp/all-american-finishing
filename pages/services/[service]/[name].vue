<template lang="pug">
.aff-service-name-detail
    ServiceHeader(v-bind="service" :style="`--main-color: ${service.color}`")
    component(v-if="service.content" v-for="(component, i) in service.content" :key="i" :is="component.component" v-bind="component.props")
</template>

<script lang="ts" setup>
import { queryContent } from "~/assets/ts/content";

definePageMeta({
  layout: "submenu",
});
const { fullPath } = useRoute();

const promises = await Promise.all([queryContent(fullPath)]);
const service = promises[0];
</script>

<style lang="scss">
.aff-service-name-detail {
  width: 100%;

  > * {
    &:not(:last-child) {
      margin-bottom: pxToRem(40);
    }

    &.sr-picture:not(.full) {
      width: 50%;
      min-width: pxToRem(320);
    }

    &.sr-text {
      &.title {
        max-width: 80%;
        color: $color-aff-blue;
        font-size: pxToRem(40) !important;
        border-bottom: {
          style: solid;
          color: $color-aff-blue;
          width: pxToRem(2);
        }
      }
    }
  }

  .partial-metal {
    background-color: $color-aff-light-gray;
    border-radius: pxToRem(8);
    padding: pxToRem(20);

    .sr-text {
      &.kind {
        &-title {
          padding-bottom: pxToRem(6);
          margin-bottom: pxToRem(20);
          border-bottom: {
            style: solid;
            color: $color-aff-gray;
            width: pxToRem(1);
          }
        }
      }
    }

    .sr-grid {
      .sr-grid-col-1 {
        align-items: center;
        justify-content: center;

        .aff-checklist {
          .sr-icon {
            width: pxToRem(25);
            height: pxToRem(25);
          }
          .sr-text {
            font-weight: bold;
          }
        }
      }
    }
  }

  .welding {
    &-title {
      font-size: pxToRem(30) !important;
      color: $color-aff-red;
      padding: pxToRem(8);
      margin-bottom: pxToRem(20);
      border: {
        style: solid;
        color: currentColor;
        width: pxToRem(2);
        radius: pxToRem(8);
      }
    }

    &-grid {
      .sr-grid-col-1 {
        align-items: center;
        justify-content: center;
        &:first-child {
          .sr-img {
            width: 90%;
            margin: auto;
          }
          border-right: {
            style: solid;
            color: rgba($color-black, 0.2);
            width: pxToRem(1);
          }
        }
      }

      .aff-checklist {
        .sr-text,
        .sr-icon {
          color: $color-aff-gray;
        }
        .sr-text {
          font-family: "aeromatics";
          font-weight: bold;
          font-size: pxToRem(20);
        }
        .sr-icon {
          width: pxToRem(25);
          height: pxToRem(25);
        }
      }
    }
  }

  .highlight {
    font-family: "aeromatics";
    font-weight: bold;
    font-size: pxToRem(20);
    color: $color-aff-red;
  }

  .aff-service-header {
    margin-bottom: pxToRem(40);
  }

  @media (min-width: $breakpoint-sm) {
    .aff-service-header {
      margin-bottom: pxToRem(80);
    }
  }
}
</style>
