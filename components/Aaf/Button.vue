<template lang="pug">
NuxtLink.aaf-button(:to="href" v-if="tag == 'a'" :disabled="disabled" :class="{'disabled': disabled, 'white': variant == 'white'}")
  span {{ label }}
button.aaf-button(v-else :disabled="disabled" :class="{'disabled': disabled, 'white': variant == 'white'}")
  span {{ label }}
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "red",
  },
});
</script>

<style lang="scss">
.aaf-button {
  --main-color: #{$color-aff-red};
  --hover-color: #{$color-aff-blue};

  &.white {
    --main-color: #{$color-white};
    --hover-color: #{$color-aff-blue};
  }

  position: relative;
  display: flex;
  max-width: pxToRem(200);
  appearance: none;
  font-size: pxToRem(20);
  font-weight: bold;
  font-style: italic;
  font-family: aeromatics, sans-serif !important;
  background-color: transparent;
  text-transform: uppercase;
  border: {
    style: solid;
    color: var(--main-color);
    width: pxToRem(2);
    radius: pxToRem(4);
  }
  color: var(--main-color);
  padding: pxToRem(8) pxToRem(16) !important;
  overflow: hidden;
  transition: color 0.35s ease-in-out;

  &:hover {
    color: $color-white;

    &::before {
      width: 130%;
    }
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    width: 0;
    height: 100%;
    top: 0;
    left: pxToRem(-20);
    transform: skew(-40deg);
    background-color: var(--hover-color);
    transition: width 0.35s ease-in-out;
  }

  span {
    font-family: inherit;
    z-index: 1;
    margin: auto;
  }
}
</style>
