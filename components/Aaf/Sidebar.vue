<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template lang="pug">
aside.aff-sidebar
    nav.aff-sidebar-nav
      ul.aff-sidebar-list
        li.aff-sidebar-item(v-for="(item, i) in items" :key="i")
          NuxtLink.aff-sidebar-item-link(:to="item.link")
            SrIcon.aff-sidebar-item-icon(:name="item.icon")
            span.aff-sidebar-item-label {{ item.label }}
        li.aff-sidebar-item
          button.aff-sidebar-item-link(@click="$emit('logout')")
            SrIcon.aff-sidebar-item-icon(name="logout-o")
            span.aff-sidebar-item-label Logout
</template>

<style lang="scss" scoped>
.aff-sidebar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: pxToRem(50);
  background-color: $color-aff-red;

  &-nav {
  }

  &-list {
  }

  &-item {
    &:not(:last-child) {
      margin-bottom: pxToRem(20);
    }
    &-link {
      position: relative;
      display: flex;
      background: none;
      border: none;
    }
    &-icon {
      color: $color-white;
      width: pxToRem(20);
      height: pxToRem(20);
    }
    &-label {
      position: absolute;
      top: 50%;
      left: calc(100% + pxToRem(25));
      transform: translateY(-50%);
      border-radius: pxToRem(8);
      background-color: $color-aff-blue;
      color: $color-white;
      max-width: 0;
      overflow: hidden;
      transition: max-width 0.35s ease-in-out, padding 0.35s ease;

      &::before {
        content: "";
        position: absolute;
        left: pxToRem(-16);
        top: 50%;
        transform: translate(-100%, -50%) rotate(45deg);
        width: pxToRem(8);
        height: pxToRem(8);
        border-radius: pxToRem(2);
        background-color: $color-aff-red;
        transform: translateX(-100%);
        transition: transform 0.35s ease;
      }
    }

    &:hover {
      .aff-sidebar-item-label {
        max-width: 100vw;
        padding: pxToRem(10);

        &::before {
          transform: translate(0%, -50%) rotate(45deg);
        }
      }
    }
  }
}
</style>
