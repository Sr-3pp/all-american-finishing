<script lang="ts" setup>
import {
  proccessContent,
  updateValue,
  deleteElement,
  EmitHandler,
} from "sr-content-2/assets/ts/utilities";
import { queryContent } from "~/assets/ts/content";

definePageMeta({
  layout: "panel",
});

const data: any = await queryContent("/");
const content = ref(proccessContent(data.content, true));

const pages = [
  { name: "Home", value: "/" },
  { name: "About us", value: "/about_us/index" },
];

const currentPage = ref("/");

const setPage = async () => {
  const { content: cont } = await queryContent(currentPage.value);
  content.value = proccessContent(cont, true);
};

const editProps = (event: any) => {
  console.log("content", event);
};

const shomComponents = ($event: any) => {
  console.log("open component catalog", $event);
  $event.content.push({
    component: "SrText",
    props: {
      text: "New component",
    },
  });
};

const updateContent = () => {
  console.log(content);
};
</script>

<template lang="pug">
.aff-content
  .top-bar
    SrFormSelect(:options="pages" v-model="currentPage" @change="setPage")
    button(@click="updateContent") Save
  component(:is="component.component" 
      v-bind="component.props" v-for="(component, idx) in content" 
      @input="updateValue(component, $event)"
      @change="updateValue(component, $event)"
      @toggle="updateValue(component, $event)"
      @delete="deleteElement(content, i)" 
      @edit-props="editProps"
      @component-list="shomComponents"
      @media-gallery="EmitHandler($event, component, (data: any) =>$emit('media-gallery', data))"
      @icon-gallery="EmitHandler($event, component, (data: any) =>$emit('icon-gallery', data))"
      :key="idx")
</template>

<style scoped></style>
