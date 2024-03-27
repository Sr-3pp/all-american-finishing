<template lang="pug">
SrContainer.aff-blog(:with-padding="true")
    SrGrid(tag="ul").aff-blog-list
        SrGridColumn.aff-blog-item(v-for="(entry, i) in blog"
            :size="{mobile: '1', sm: '1/3'}"
            :key="i"
        )
            NuxtLink(:to="`blog/${entry.id}`")
                BlogCard(v-bind="entry")

</template>

<style lang="scss" setup></style>

<script lang="ts" setup>
const route = useRoute();
const { data: blog } = await $fetch("/api/blog");
</script>
