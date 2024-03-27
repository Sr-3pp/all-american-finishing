<template lang="pug">
.aff-project-card
    SrPicture(:src="thumbs[0]" :alt="name")
    SrText(:text="name" class="title")

</template>

<script lang="ts">
export default defineComponent({
  props: {
    thumbs: {
      type: Array,
      defuault: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.aff-project-card {
  .sr-picture {
    margin-bottom: pxToRem(20);
    border-radius: pxToRem(8);
    overflow: hidden;
  }
}
</style>
