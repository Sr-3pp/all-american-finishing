<script lang="ts" setup>
const parallax = ref<HTMLElement | null>(null);

const { x, y } = useWindowScroll();

watch([x, y], () => {
  const totalHeight = document.body.clientHeight - window.innerHeight;
  const percent = ((y.value / totalHeight) * 100).toFixed(2);
  (parallax as any).value.style.backgroundPosition = `0% ${percent}%`;
});
</script>

<template lang="pug">
.aff-parallax(ref="parallax")
    SrContainer(:with-padding="true")
      SrText(text="No Job is to Big or to Small for us" class="title")
</template>

<style lang="scss" scoped>
.aff-parallax {
  background-image: url("/media/welding_3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 0%;
  height: 60vh;
  min-height: pxToRem(500);
  display: flex;
  justify-content: center;
  align-items: center;

  .sr-text {
    --text-align: center;
    max-width: pxToRem(600);
    margin: 0 auto;
    color: $color-white;
    padding: pxToRem(20);
    border: {
      width: pxToRem(2);
      color: $color-white;
      style: solid;
      radius: pxToRem(8);
    }
  }
}
</style>
