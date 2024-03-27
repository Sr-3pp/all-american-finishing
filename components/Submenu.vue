<template lang="pug">
ul.aff-submenu(v-if="submenu")
    li.aff-submenu-item(v-for="([key, value], i) in Object.entries(submenu)" :key="i")
        NuxtLink(:to="'/'+ section  +'/' + key")
            SrText(:text="key.replace(/_/g, ' ')")
            SrIcon(name="chevron-down" v-if="value.length > 1")
            SrIcon(name="star-f" v-else)
        ol.aff-submenu-sub(v-if="value.length > 1")
            template(v-for="(sub, e) in value")
                li.aff-submenu-sub-item(:key="e" v-if="sub !== 'index.json'")
                    NuxtLink(:to="'/'+ section  +'/' + key + '/' + sub.replace('#', '').replace('.json', '')")
                        SrText(:text="sub.replace('_', ' ').replace('.json', '')")
</template>

<script lang="ts">
export default defineComponent({
  props: {
    section: {
      type: String,
      default: "",
    },
  },
  async setup(props, data) {
    const getSubmenu = async (section: string) => {
      const { data } = await useFetch("/api/get-submenu?section=" + section);
      return data;
    };

    const submenu_data: any = await getSubmenu(props.section);

    return {
      submenu_data,
      getSubmenu,
    };
  },
  async mounted() {
    this.submenu = await this.getSubmenu(this.section);
  },
  data() {
    const submenu: any = this.submenu_data;

    return {
      submenu,
    };
  },
  watch: {
    section: {
      async handler(val: string) {
        this.submenu = await this.getSubmenu(val);
      },
    },
  },
});
</script>

<style lang="scss">
.aff-submenu {
  margin-bottom: pxToRem(20);
  background-color: $color-aff-light-gray;
  border-radius: pxToRem(8);
  overflow: hidden;

  &-item {
    &:not(:last-child) {
      border-bottom: {
        style: solid;
        color: $color-white;
        width: pxToRem(1);
      }
    }

    > a {
      display: flex;
      text-transform: capitalize;
      transition: background-color 0.35s ease;

      .sr-text {
        padding: pxToRem(10) pxToRem(20);
        font-size: pxToRem(16);
        color: $color-white;
        position: relative;

        &-container {
          position: relative;
          z-index: 1;
        }

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background-color: $color-aff-blue;
          width: 105%;
          height: 100%;
          transform: translateX(-101%);
          transition: all 0.35s ease;
          z-index: 0;
        }

        &-text-container {
          position: relative;
          z-index: 1;
        }
      }

      &:hover {
        background-color: $color-aff-red;

        .sr-text {
          &::before {
            transform: translateX(-10%) skewX(30deg);
          }
        }
      }
    }

    &:has(.router-link-exact-active) {
      .aff-submenu-sub {
        max-height: 100vh;

        &-item:has(.router-link-exact-active) {
          background-color: $color-aff-light-gray;
          color: $color-white;
        }
      }
      > a {
        background-color: $color-aff-red;

        .sr-text {
          &::before {
            transform: translateX(-10%) skewX(30deg);
          }
        }
      }
    }
  }

  .sr-icon {
    width: pxToRem(25);
    height: pxToRem(25);
    margin-left: auto;
    color: $color-white;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: pxToRem(10);
  }

  &-sub {
    background-color: $color-white;

    border: {
      right: {
        style: solid;
        color: $color-aff-light-gray;
        width: pxToRem(2);
      }

      left: {
        style: solid;
        color: $color-aff-light-gray;
        width: pxToRem(2);
      }
    }

    max-height: 0;
    overflow: hidden;
    transition: all 0.35s ease;
    color: $color-aff-gray;
    a {
      display: flex;
      color: currentColor;
      text-transform: capitalize;
      padding: pxToRem(10) pxToRem(20);
    }

    &-item {
      padding-left: pxToRem(20);
      transition: background-color 0.35s ease;

      &:hover {
        background-color: $color-aff-light-gray;
        color: $color-white;
      }
    }
  }
}
</style>
