<template lang="pug">
Navbar(ref="navEl" :navigation="navigation")
main.sumbenu-layout(:style="`--header-height: ${headerHeight}px`")
    SrContainer(:with-padding="true")
        SrGrid
            SrGridColumn(:size="{mobile: '1', sm: '2/3'}")
                NuxtPage
            SrGridColumn(:size="{mobile: '1', sm: '1/3'}")
                .submenu-wrapper
                    Submenu(:section="section")

                    Newsletter
Footer(:contact="contact" :navigation="navigation")
</template>

<script lang="ts" setup>
import { fetchContentNavigation, queryContent } from "~/assets/ts/content";

const $seo = {
  title: "",
  meta: [],
};

const route: any = useRoute();
const { path }: any = route;
const section = ref(route.name.split("-")[0]);

const promises = await Promise.all([
  queryContent(path),
  fetchContentNavigation(),
  queryContent("_config/nav_order"),
]);

const navEl = ref();

const headerHeight = ref(0);

const { data: nav }: any = promises[1];
const { nav_order } = promises[2];

const items: any = Object.entries(nav.value)
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

const { seo }: any = promises[0];
$seo.title = seo?.title;
$seo.meta = seo?.meta;

onMounted(() => {
  headerHeight.value = navEl.value.$el.offsetHeight + 40;
});

const toggleNav = () => {
  console.log("toggle nav");
};

watch(
  () => route.name,
  (val) => {
    section.value = val.split("-")[0];
  }
);
</script>

<style lang="scss" scoped>
#__nuxt {
  height: 100vh;
  overflow: hidden;

  .sumbenu-layout {
    height: 100%;
    display: flex;
    overflow: visible;

    .sr-container {
      display: flex;
      height: 100%;
      overflow: visible;

      &.variant-with-space {
        padding-top: 0;
      }

      > .sr-grid {
        height: 100%;
        overflow: visible;

        > * {
          padding-top: pxToRem(20);

          @media (min-width: $breakpoint-md) {
            padding-top: pxToRem(40);
          }
        }
      }

      .submenu-wrapper {
        position: sticky;
        top: var(--header-height, 160px);

        > *:not(:last-child) {
          margin-bottom: pxToRem(20);
        }
      }
    }
  }
}
</style>
