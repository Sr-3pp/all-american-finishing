<template lang="pug">
.aff-service-card(:class="{inverted: description}")
    SrPicture(:src="thumb")
    .aff-service-card-content
        SrIcon(:name="icon")
        div
          SrText(:text="name" class="subtitle")
          SrText.description(v-if="description" :text="description" class="text")
</template>

<script lang="ts">
export default defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
    thumb: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.aff-service-card {
  --hover-color: #{$color-aff-blue};
  border-radius: pxToRem(16);
  overflow: hidden;
  width: 100%;
  transition: transform 0.35s ease;
  display: flex;
  flex-direction: column;

  .sr-picture {
    height: 100%;
    display: flex;
    img {
      height: 100%;
    }
  }

  &.inverted {
    .aff-service-card {
      &-content {
        flex-direction: row-reverse;
        .sr-icon {
          margin-left: pxToRem(10);
          margin-right: 0;
          padding: pxToRem(8);
          border: {
            style: solid;
            color: currentColor;
            width: pxToRem(1);
          }
        }
      }
    }
  }

  &-content {
    flex-shrink: 0;
    background-color: $color-aff-gray;
    padding: pxToRem(20);
    overflow: hidden;
    display: flex;
    align-items: center;
    color: $color-white;
    transition: color 0.35s ease, background-color 0.35s ease;

    .sr-icon {
      color: currentColor;
      width: pxToRem(60);
      height: pxToRem(60);
      margin-right: pxToRem(10);
      flex-shrink: 0;
    }

    .sr-text {
      .subtitle {
        font-size: pxToRem(30) !important;
      }
    }

    .description {
      font-size: pxToRem(14);
      line-height: 1.5;
      max-height: pxToRem(100);
      text-overflow: ellipsis;
      margin-bottom: pxToRem(5);
      margin-top: pxToRem(10);

      .sr-text-container {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  &:hover {
    .aff-service-card {
      &-content {
        background-color: var(--hover-color);
        color: $color-white;
      }
    }

    transform: scale(1.02);
  }
}
</style>
