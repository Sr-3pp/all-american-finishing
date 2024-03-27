<template lang="pug">
Navbar(:navigation="navigation")
main
    NuxtPage()
Footer(:contact="contact" :navigation="navigation")
</template>

<script lang="ts" setup>
import { fetchContentNavigation, queryContent } from "~/assets/ts/content";
const $seo = {
  title: "",
  meta: [],
};
const { path }: any = useRoute();

const promises = await Promise.all([
  fetchContentNavigation(),
  queryContent("_config/nav_order"),
]);
const { data: nav }: any = promises[0];
const { nav_order } = promises[1];

const items = Object.entries(nav.value)
  .map(([key, value]: any) => {
    if (key !== "files") {
      const subItems = Object.entries(value)
        .map(([key, value]: any) => {
          if (key !== "url" && key !== "files") {
            return {
              _path: value.url,
              name: key,
            };
          }
        })
        .filter((el) => el);

      value.files.forEach((el: any) => {
        if (!el.includes("index")) {
          subItems.push({
            _path: `/${key}/${el.replace(".json", "")}`,
            name: el.replace(".json", "").replace(/_/g, " "),
          });
        }
      });

      return {
        _path: value.url,
        name: key,
        items: subItems,
      };
    }
  })
  .filter((el) => el);

const files = [...new Set(nav.value.files)];

files.forEach((el: any) => {
  items.push({
    _path: `/${el.includes("index") ? "" : el.replace(".json", "")}`,
    name: el.includes("index") ? "home" : el.replace(".json", ""),
    items: [],
  });
});

const navigation = nav_order
  .map((name: string) => {
    const fileName = name == "index" ? "home" : name;
    const item = items.find((el: any) => el.name == fileName);
    if (item) {
      return item;
    }
  })
  .filter((el: any) => el);

const contact = await queryContent("_config/contact");

try {
  const { seo }: any = await queryContent(path);
  $seo.title = seo?.title;
  $seo.meta = seo?.meta;
} catch (error) {}

const toggleNav = () => {
  console.log("toggle nav");
};
</script>
