<template lang="pug">
section.last-news
    SrContainer(:with_space="true")
        SrText(kind="title" value="Last News" alignment="center")
        SrGrid.last-news-list(tag="ul")
            SrGridColumn.last-news-item(:size="{mobile: '1', sm: '1/3'}" v-for="(entry, i) in last_news" :key="i")
                NuxtLink(:to="'/about_us/blog/'+entry.id")
                    BlogCard(v-bind="entry")
</template>

<script lang="ts">
export default defineComponent({
  async setup() {
    const { data: last_news }: any = await useFetch("/api/blog/last_news");

    return {
      last_news: last_news.value.data,
    };
  },
});
</script>

<style lang="scss">
.last-news {
  display: flex;
  .sr-container {
    > .sr-text {
      margin-bottom: pxToRem(20);
    }
  }
}
</style>
