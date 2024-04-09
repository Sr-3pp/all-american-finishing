<template lang="pug">
component(v-for="(item, i) in content" :key="i" :is="item.component" v-bind="item.props")
</template>

<script lang="ts">
import { queryContent } from "~/assets/ts/content";

export default defineComponent({
  async setup() {
    const { content } = await queryContent("/");
    return {
      content,
    };
  },
});
</script>

<style lang="scss">
.aaf-navbar {
  position: fixed;
}

.index {
  &_1,
  &_2,
  &_3,
  &_4,
  &_5,
  &_6,
  &_7 {
    z-index: 2;
    background-color: white;
  }

  &_1 {
    display: flex;

    .aff-slider {
      .swiper {
        &-wrapper {
          min-height: 80vh;
        }
      }

      .sr-section {
        height: 100%;
      }

      .sr-container {
        position: relative;
        color: $color-white;
      }
    }
  }

  &_2 {
    .sr-tabs {
      position: relative;
      z-index: 2;
      overflow: visible;

      &-items {
        position: relative;
        z-index: 2;
        overflow: visible !important;
        padding-bottom: pxToRem(30);
        margin-top: pxToRem(-160);
      }

      &-item {
        position: relative;
        z-index: 2;
        display: flex;

        button {
          border: none;
          appearance: none;
          display: flex;
          align-items: center;
          padding: pxToRem(16) !important;
        }
      }

      &-content {
        border: none;
      }
    }
  }

  &_3 {
    position: relative;
    overflow: hidden;
    background-color: $color-aff-blue;

    @media (min-width: $breakpoint-sm) {
      background-color: transparent;
    }

    &_bg {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      display: flex;

      .full-bg {
        position: absolute !important;
        width: 100%;
        top: 0;
        left: 0;

        height: 40%;

        img {
          height: 100%;
        }

        @media (min-width: $breakpoint-sm) {
          height: 100%;
          img {
            height: auto;
          }
        }
      }
      .star-bg {
        width: auto !important;
        height: 100% !important;
        margin-left: auto;
        overflow: visible !important;

        @media (min-width: $breakpoint-sm) {
          min-width: 60%;
          img {
            height: auto !important;
          }
        }
      }
    }

    .sr-container {
      &.contained {
        padding-right: 0 !important;
        padding-left: 0 !important;
      }
      position: relative;

      .sr-text {
        width: 100%;
        color: $color-white;
        padding-right: pxToRem(20);
        padding-left: pxToRem(20);

        &.text-right {
          width: 80%;
          margin-left: auto;
          @media (min-width: $breakpoint-sm) {
            width: 100%;
          }
        }

        &.text {
          max-width: 60%;
          margin-left: auto;
        }

        &.title {
          font-weight: bold;
          margin-bottom: pxToRem(40);
        }
      }

      .sr-grid {
        [class*="sr-grid-col-"] {
          align-content: center;
          justify-content: center;
        }

        &.inverted {
          justify-content: flex-end;
        }
      }
    }

    .counter_wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      background-color: $color-aff-blue;

      @media (min-width: $breakpoint-sm) {
        flex-direction: row;
        justify-content: flex-end;
      }

      .aff-counter {
        color: $color-white;
        padding-top: pxToRem(30);

        @media (min-width: $breakpoint-sm) {
          padding-top: pxToRem(60);
          &:not(:last-child) {
            margin-right: pxToRem(20);
          }
        }

        .sr-text {
          font-weight: bold;
          max-width: inherit;
        }
      }
    }
  }

  &_4 {
    .sr-text {
      --text-align: center !important;
    }

    .sr-icon {
      width: pxToRem(100);
      height: pxToRem(100);
      margin-right: auto;
      margin-left: auto;
      margin-bottom: pxToRem(20);
    }
  }

  &_5 {
    background-color: $color-aff-blue;

    .sr-text {
      &.title {
        color: $color-white;
      }
    }
  }

  &_6 {
    padding-top: pxToRem(40);
    background-color: $color-aff-red;
    color: $color-white;
  }

  &_7 {
    .sr-container {
      position: relative;

      .sr-text {
        margin-bottom: pxToRem(20);
        &.title {
          color: $color-aff-red;
        }
      }
    }
  }
}

.sr-parallax {
  .sr-container {
    height: 50vh;
    display: flex;
    align-items: center;

    .sr-text {
      color: $color-white;
      width: 100%;
      &.title {
        .sr-text-text-container {
          padding: pxToRem(20) pxToRem(40);

          border: {
            style: solid;
            color: $color-white;
            width: unti(1);
            radius: pxToRem(16);
          }
        }
      }
    }
  }
}
</style>
