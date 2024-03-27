<template lang="pug">
.aff-project-detail
    SrText(:text="project.name" class="title")
    SrGrid.aff-project-thumb-list(tag="ul")
        SrGridColumn.aff-project-thumb-item(v-for="(thumb, i) in project.thumbs" :key="i" :size="{mobile: '1', sm: '1/2'}")
            button(@click="showGallery(i)")
                SrPicture(:src="thumb")

SrModal(:active="gallery_sw" @close="gallery_sw = false")
    template(#body)
        .sr-modal-body
            Slider(:slides="project.thumbs.map((slide) => ({content: [{component : 'SrPicture',props: {src: slide, alt: project.name}}]}))")
</template>

<script lang="ts" setup>
import { queryContent } from "~/assets/ts/content";
import type { Project } from "~/types/Project";

definePageMeta({
  layout: "submenu",
});

const { params } = useRoute();
const project_name = params.project;
const { data: project }: { data: Project } = await $fetch(
  `/api/project/${project_name}`
);

const current: Ref<number> = ref(0);

const gallery_sw: Ref<boolean> = ref(false);

const showGallery = (idx: number) => {
  current.value = idx;
  gallery_sw.value = true;
};
</script>

<style lang="scss">
.aff-project-detail {
  width: 100%;
}
</style>
