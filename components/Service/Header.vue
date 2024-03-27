<template lang="pug">
.aff-service-header
    SrPicture(:src="thumb" :class="{'no-thumb': !thumb}")
        .aff-service-header-icon(v-if="icon")
            SrIcon(:name="icon")
        .aff-service-header-caption(v-if="caption")
            SrText(:text="caption" class="subtitle")
        SrIcon.aff-service-header-title-icon(v-if="name" name="starHeader")
    SrText.aff-service-header-title(:text="name" class="title" v-if="name")
    SrPicture.aff-service-header-description-image(:src="finish_img" v-if="finish_img")
    SrText.aff-service-header-description(:text="description" v-if="description")
</template>

<script lang="ts">
export default defineComponent({
  props: {
    thumb: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    finish_img: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.aff-service-header {
  --main-color: #{$color-aff-blue};
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .sr-picture {
    height: pxToRem(350);
    overflow: visible;

    img {
      height: 100%;
    }

    &.no-thumb {
      height: auto;
      img {
        display: none;
      }
    }
  }

  .sr-text {
    &.title {
      font-size: pxToRem(40) !important;
    }
  }

  &-icon {
    overflow: hidden;
    position: absolute;
    top: -0%;
    left: 0;
    padding: pxToRem(20);
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;

    &::after {
      content: "";
      position: absolute;
      left: -140%;
      top: -160%;
      height: 250%;
      width: 250%;
      transform: rotate(-70deg);
      background-color: var(--main-color);
    }

    .sr-icon {
      position: relative;
      z-index: 1;
      color: $color-white;
      width: pxToRem(180);
      height: pxToRem(180);
    }
  }

  &-title {
    height: pxToRem(100);
    align-items: center;
    padding-left: pxToRem(40);
    margin-bottom: 8%;
    color: var(--main-color);
    display: flex;

    &-icon {
      &.sr-icon {
        color: var(--main-color, #{$color-aff-blue});
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 70%;
        min-height: pxToRem(250);
        padding: 0;
      }
    }
  }

  &-description {
    max-width: 70%;
    padding-left: pxToRem(40);

    &-image {
      &.sr-picture {
        width: 50%;
        margin: auto;
        img {
          height: 100%;
          width: auto;
        }
      }
    }
  }

  &-caption {
    position: absolute;
    width: 100%;
    padding: pxToRem(20);
    color: $color-white;
    background-color: var(--main-color);
    left: 0;
    bottom: 0;
  }
}
</style>
