<template lang="pug">
section.aff-testimonials
    Swiper(:modules="[SwiperEffectCreative, SwiperPagination, SwiperNavigation]")
        SwiperSlide.testimonials-slide(v-for="(testimonial, i) in testimonials" :key="i")
            .aff-testimonials-background
                SrPicture(:src="testimonial.picture")
            SrContainer(:with-padding="true")
                SrText(:text="testimonial.name" class="title text-center")
                .separator
                    hr
                SrText(:text="testimonial.testimonial" class="text-center")
        div.swiper-button-prev
        div.swiper-button-next

</template>

<script lang="ts">
import { queryContent } from "~/assets/ts/content";

export default defineComponent({
  async setup() {
    const { testimonials } = await queryContent("_testimonials");
    //console.log(testimonials);

    return {
      testimonials,
    };
  },
});
</script>

<style lang="scss">
.aff-testimonials {
  background-color: $color-white;
  position: relative;
  z-index: 2;

  &-background {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
    z-index: -1;

    .sr-picture {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .swiper {
    &-button-prev,
    &-button-next {
      color: $color-white;
      background-color: rgba($color-aff-blue, 0.5);
      border-radius: pxToRem(8);
      width: pxToRem(40);
      height: pxToRem(40);
      display: flex;
      align-items: center;
      justify-content: center;
      &::after,
      &::before {
        font-size: pxToRem(25);
        font-weight: bold;
      }
    }
  }

  .sr-container {
    position: relative;

    .separator {
      padding-top: pxToRem(20);
      padding-bottom: pxToRem(20);
    }
  }
}
</style>
