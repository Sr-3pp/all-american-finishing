<script lang="ts" setup>
defineProps({
  product: {
    type: Object,
    default: () => ({
      name: "",
      description: "",
      thumbs: ["https://via.placeholder.com/300x300"],
    }),
  },
});
</script>

<template lang="pug">
article.aff-product-card
  SrPicture(:src="product.thumbs[0]")
  SrText.aff-product-card-title(:text="product.name")
  SrText.aff-product-card-description(:text="product.description")
</template>

<style lang="scss" scoped></style>
