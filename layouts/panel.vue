<script lang="ts" setup>
const sidebarItems = [
  {
    label: "Panel",
    icon: "panel-o",
    link: "/panel",
  },
  {
    label: "Users",
    icon: "user-f",
    link: "/panel/users",
  },
  {
    label: "Testimonals",
    icon: "testimonials-o",
    link: "/panel/testimonials",
  },
  {
    label: "Ranks",
    icon: "ranking-f",
    link: "/panel/ranking",
  },
  {
    label: "Projects",
    icon: "projects-o",
    link: "/panel/projects",
  },
  {
    label: "Fabrication",
    icon: "sierra-o",
    link: "/panel/fabrication",
  },
  {
    label: "Catalog",
    icon: "products-o",
    link: "/panel/catalog",
  },
  {
    label: "Jobs",
    icon: "job-o",
    link: "/panel/jobs",
  },
  {
    label: "Content",
    icon: "edit-o",
    link: "/panel/content",
  },
];
const logout = () => useAuth().logout();
</script>

<template lang="pug">
main.panel
  AafSidebar(:items="sidebarItems" @logout="logout")
  NuxtPage
</template>

<style lang="scss" scoped>
.panel {
  padding-left: pxToRem(50);
}
</style>
