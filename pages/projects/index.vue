<template lang="pug">
SrGrid.project-list(tag="ul")
    SrGridColumn.project-list-item(:size="{mobile: '1', sm: '1/2'}" v-for="(project, i) in projects" :key="i")
        NuxtLink(:to="'/projects/'+ project.name.toLowerCase().replace(/ /g, '_')")
            ProjectCard(v-bind="project")
</template>

<style lang="scss"></style>

<script lang="ts" setup>
import type { Project } from "~/types/Project";

definePageMeta({
  layout: "submenu",
});
const { data: projects }: { data: Project[] } = await $fetch("/api/project");
</script>
