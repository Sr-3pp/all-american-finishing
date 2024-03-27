<script lang="ts" setup>
const { product: productId } = useRoute().params;
const { data: product }: any = await $fetch(`/api/catalog/${productId}`);
</script>

<template lang="pug">
.aff-product-detail
    SrContainer(:with-padding="true")
        AafButton(label="Back to catalog" tag="a" href="/catalog")
        SrPicture(:src="product.image")
        p {{ product.name }}
        p {{ product.description }}
        p {{ product.price }}
                 
</template>

<style lang="scss" scoped>
.aff-product-detail {
  .sr-container {
    display: flex;
    flex-direction: column;
    gap: pxToRem(20);
  }
}
</style>
