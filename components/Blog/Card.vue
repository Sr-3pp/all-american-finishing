<template lang="pug">
article.aff-blog-card
    SrPicture(:src="banner")
        .aff-blog-card-date 
            SrText(:text="created_at")
    .aff-blog-card-content 
        SrText(:text="title" class="title")
        SrText(:text="resume")
        SrText.read-more(text="Read More" class="text-right")
</template>

<script lang="ts">
export default defineComponent({
  props: {
    banner: {
      type: String,
      default: "https://picsum.photos/400/250",
    },
    title: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      defalut: "",
    },
    created_at: {
      type: String,
      default: "",
    },
    content: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.aff-blog-card {
  border-radius: pxToRem(8);
  overflow: hidden;
  box-shadow: 0 pxToRem(10) pxToRem(10) rgba($color-black, 0.4);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-5%);
    box-shadow: 0 pxToRem(20) pxToRem(20) rgba($color-black, 0.4);
  }

  .sr-picture {
    height: pxToRem(200);
    img {
      height: 100%;
    }
  }

  .read-more {
    font-size: pxToRem(14);
  }

  &-date {
    position: absolute;
    bottom: 0;
    right: 0;
    color: $color-white;
    background-color: rgba($color-black, 0.8);
    border-top-left-radius: pxToRem(8);
    padding: pxToRem(6) pxToRem(10);
    z-index: 2;

    .sr-text {
      &.title {
        font-size: pxToRem(12);
      }
    }
  }

  &-content {
    padding: pxToRem(20);
    background-color: $color-white;

    .sr-text {
      color: $color-black;

      &.title {
        color: $color-black;
        margin-bottom: pxToRem(10);
      }

      &:not(.title) {
        color: $color-black;
        font-size: pxToRem(14);
        line-height: pxToRem(22);

        &:not(:last-child) {
          margin-bottom: pxToRem(20);
        }
      }
    }
  }
}
</style>
