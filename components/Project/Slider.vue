<template lang="pug">
.project-slider(ref='project-slider')
    ul.project-slider-list
        li.slide(v-for="(slide, i) in projects" :key="i + 1")
            NuxtLink(:to="'/projects/' + slide.name" :aria-label="slide.name").project-card
                figure.img
                    img(width="100%" height="100%" :src="slide.thumbs[0]" :alt="slide.name" loading="lazy")
        li.slide(v-for="(slide, i) in projects" :key="-i")
            NuxtLink(:to="'/projects/' + slide.name" :aria-label="slide.name").project-card
                figure.img
                    img(width="100%" height="100%" :src="slide.thumbs[0]" :alt="slide.name" loading="lazy")
</template>

<script lang="ts" setup>
import type { Project } from "~/types";
const { data }: any = await useFetch("/api/project");
const { data: projects } = data.value || [];
</script>

<style lang="scss">
.project-slider {
  overflow: hidden;
  padding-top: pxToRem(40);
  padding-bottom: pxToRem(40);
  --speed: 15s;
  &-list {
    display: flex;
    width: calc(40vw * 5);

    &:hover {
      .slide {
        animation-play-state: paused;
      }
    }
  }
  .slide {
    flex-shrink: 0;
    width: 40vw;
    animation: translateinfinite var(--speed) linear infinite;

    .img {
      height: pxToRem(200);

      @media (min-width: $breakpoint-sm) {
        height: pxToRem(300);
      }

      img {
        transition: transform 0.35s ease;
        height: 100%;
      }
    }

    &:hover {
      .img {
        img {
          transform: scale(1.2);
        }
      }
    }

    @keyframes translateinfinite {
      100% {
        transform: translateX(calc(-100% * 5));
      }
    }
  }
}
</style>
