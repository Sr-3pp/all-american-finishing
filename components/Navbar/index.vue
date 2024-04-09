<template lang="pug">
nav.aff-navbar(:class="{open: open, 'on_top': on_top, 'is_home': is_home}")
    SrContainer
        ul.aff-navbar-left
            li.aff-navbar-brand
                NuxtLink(to="/")
                    SrPicture(:src="`${is_home && on_top ? '/svg/logo_bn.svg' : '/svg/logo.svg'}`")
        button.aff-navbar-burger(@click="open = !open")
            SrIcon(name="burger-o")
        ul.aff-navbar-right
            li.aff-navbar-item
              button.aff-navbar-close(@click="open = !open")
                SrIcon(name="chevron-left")
            li.aff-navbar-item(v-for="({_path, name, items}, i) in navigation" :key="i")
                NuxtLink(:to="_path") {{ name.replace(/_/g, ' ') }}
                ol.aff-navbar-submenu(v-if="items.length")
                    li.aff-navbar-submenu-item(v-for="(item, e) in items" :key="i")
                        NuxtLink(:to="item._path") {{ item.name.replace(/_/g, ' ') }}
</template>

<script lang="ts">
export default defineComponent({
  props: {
    navigation: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const route = useRoute();
    const on_top: boolean = true;
    const open: boolean = false;
    const { y: scrolled } = useWindowScroll();
    const is_home: boolean = route.name == "index" ? true : false;
    return {
      open,
      scrolled,
      on_top,
      is_home,
      route,
    };
  },
  watch: {
    scrolled: {
      handler(val: number) {
        if (this.is_home && val > this.$el.offsetHeight) {
          this.on_top = false;
        } else {
          this.on_top = true;
        }
      },
    },
    "route.name": {
      handler(val: string) {
        this.is_home = val == "index" ? true : false;
      },
    },
  },
});
</script>

<style lang="scss">
.aff-navbar {
  position: sticky;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 8;
  background-color: $color-white;
  box-shadow: 0 0 pxToRem(20) rgba($color-black, 0.5);
  transition: background-color 0.35s ease;

  .sr-container {
    display: flex;
    align-items: center;
  }

  &-burger,
  &-close {
    background: none;
    border: none;
    margin-left: auto;
    .sr-icon {
      width: pxToRem(50);
      height: pxToRem(50);
      color: currentColor;
    }

    @media (min-width: $breakpoint-sm) {
      display: none;
    }
  }

  &-right,
  &-left {
    width: 50%;
    display: flex;
  }

  &-right {
    position: fixed;
    top: 0;
    right: -100%;
    width: 90%;
    height: 100vh;
    overflow: auto;
    background-color: $color-aff-blue;
    flex-direction: column;
    @media (min-width: $breakpoint-sm) {
      overflow: visible;
      top: inherit;
      right: inherit;
      flex-direction: row;
      position: relative;
      justify-content: flex-end;
      opacity: 1;
      width: auto;
      height: auto;
      background-color: transparent;
      .aff-navbar-item {
        &:first-of-type {
          display: none;
        }
      }
    }

    @media (max-width: $breakpoint-sm) {
      padding: pxToRem(20);
      transition: right 0.35s ease-in-out, opacity 0.35s ease-in-out;

      .aff-navbar {
        &-item {
          &:not(:last-child) {
            margin-bottom: pxToRem(20);
          }
        }
      }
    }
  }

  &.open {
    .aff-navbar-right {
      right: 0;
      opacity: 1;
    }
  }

  &-brand {
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);
  }

  &-item {
    display: flex;
    position: relative;
    color: $color-white;
    border-radius: pxToRem(8);

    @media (min-width: $breakpoint-sm) {
      color: $color-black;
    }

    &:not(:last-child) {
      margin-right: pxToRem(5);
    }

    > a {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: currentColor;
      transition: color 0.35s ease;
    }

    > * {
      white-space: pre;
      padding: pxToRem(5) pxToRem(20);
      text-transform: capitalize;
      color: currentColor;
    }

    &:has(.router-link-exact-active) {
      height: pxToRem(40);
      border: {
        style: solid;
        color: currentColor;
        width: pxToRem(2);
      }
    }

    &:hover {
      box-shadow: 0 0 pxToRem(7) rgba($color-black, 0.3);

      .aff-navbar-submenu {
        padding: pxToRem(3);
        max-height: 100vh;
        opacity: 1;
      }
    }
  }

  &.is_home {
    position: fixed;
    box-shadow: none;

    &.on_top {
      box-shadow: 0 0 pxToRem(20) rgba($color-black, 0.5);
      background-color: transparent;

      .aff-navbar-item,
      .aff-navbar-burger {
        color: $color-white;
      }
    }
  }

  &-submenu {
    position: absolute;
    min-width: pxToRem(150);
    left: 0;
    top: calc(100% + pxToRem(10));
    background-color: rgba($color-white, 0.8);
    padding: 0;
    opacity: 0;
    overflow: hidden;
    max-height: 0;
    box-shadow: 0 0 pxToRem(10) rgba($color-black, 0.5);
    transition: max-height 0.35s ease, padding 0.35s ease, opacity 0.35s ease;

    &-item {
      display: flex;

      a {
        width: 100%;
        text-decoration: none;
        color: $color-white;
        background-color: $color-aff-gray;
        padding: pxToRem(10) pxToRem(16);
        font-size: pxToRem(14);
        transition: background-color 0.35s ease;

        &:hover {
          background-color: $color-aff-light-gray;
        }
      }

      &:not(:last-child) {
        margin-bottom: pxToRem(3);
      }
    }
  }
}
</style>
