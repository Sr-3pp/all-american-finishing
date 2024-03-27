<template lang="pug">
Swiper.aff-slider(:modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination, SwiperNavigation]"
    :slides-per-view="1"
    :loop="sliderOptions.loop"
    :effect="'creative'"
    :autoplay="sliderOptions.autoplayOptions"
    :creative-effect="sliderOptions.creativeEffectOptions"
    :pagination="sliderOptions.pagination"
    :navigation="sliderOptions.navigation")
    
  SwiperSlide(v-for="slide in slides" :key="slide")
    component(:is="component.component" v-for="component in slide.content" v-bind="component.props" :key="slide")  
    
  div.swiper-pagination
  div.swiper-button-prev
  div.swiper-button-next
</template>

<script lang="ts" setup>
defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
  sliderOptions: {
    type: Object,
    default: () => ({
      autoplayOptions: {
        delay: 8000,
        disableOnInteraction: true,
      },
      creativeEffectOptions: {
        prev: {
          shadow: false,
          translate: ["-100%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    }),
  },
});
</script>

<style lang="scss">
.aff-slider {
  width: 100%;
  display: flex;
  align-items: center;

  .swiper {
    &-wrapper {
      width: 100%;
    }
    &-slide {
      height: 80vh;
      display: flex;
      .sr-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    &-button-next,
    &-button-prev {
      border-radius: pxToRem(8);
      padding: pxToRem(10);
      width: pxToRem(50);
      height: pxToRem(50);
      background-color: rgba($color-aff-blue, 0.5);
      backdrop-filter: blur(pxToRem(10));
      color: $color-white;

      &::after,
      &::before {
        font-size: pxToRem(30);
      }
    }
  }
}
</style>
