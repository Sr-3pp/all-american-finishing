<script lang="ts" setup>
const { data: products }: any = await $fetch("/api/catalog");
</script>

<template lang="pug">
.aff-catalog
    SrContainer(:with-padding="true")
        SrGrid(tag="ul").aff-catalog-list
            SrGridColumn.aff-catalog-item(v-for="(product, i) in products"
                :size="{mobile: '1', sm: '1/3'}"
                :key="i"
            )
                NuxtLink(:to="`/catalog/${product.id}`")
                  ProductCard(:product="product")
</template>

<style scoped></style>
