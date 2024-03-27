<template lang="pug">
footer.aff-footer 
    SrContainer(:with-padding="true")
        SrGrid(tag="ul")
            SrGridColumn(:size="{mobile: '1', sm: '1/5'}" class="aff-footer-list column")
                SrPicture(src="/svg/logo_bn.svg")
                SrText(:text="contact.description")
            template(v-for="(item, i) in navigation")
                SrGridColumn(:size="{mobile: '1', sm: '1/5'}" class="aff-footer-list column" v-if="!['home', 'contact', 'catalog'].includes(item.name)" :key="i")
                    SrText(:text="item.name.replace(/_/g, ' ')" class="title")
                    ol.aff-footer-list
                        li.aff-footer-item(v-for="(sub, j) in item.items" :key="j")
                            NuxtLink(:to="sub._path")
                                SrText(:text="sub.name.replace(/_/g, ' ')")
            SrGridColumn(:size="{mobile: '1', sm: '1/5'}" class="aff-footer-list column")
                SrText(text="Contact us" class="title")
                ol.aff-footer-list
                    li.aff-footer-item
                        SrIcon(name="pin-o")
                        div
                            SrText(:text="contact.address.line_1")
                            SrText(:text="contact.address.line_2")
                    li.aff-footer-item
                        SrIcon(name="tel-o")
                        SrText(:text="contact.tel")
                    li.aff-footer-item
                        SrIcon(name="cel-o")
                        SrText(:text="contact.cel")
                    li.aff-footer-item
                        SrIcon(name="fax-o")
                        SrText(:text="contact.fax")
                    li.aff-footer-item
                        SrIcon(name="envelope-o")
                        div
                            SrText.email(v-for="mail in contact.email" :key="1" :text="mail")
        div.aff-footer-bottom
          .aff-footer-bottom-left
            SrText(text="Powered by sr3pp © 2021 All Rights reserved.")
          .aff-footer-bottom-right
            NuxtLink(to="/documents/terms_of_use.pdf" target="_blank") Terms and Conditions
            NuxtLink(to="/documents/privacy_policy.pdf" target="_blank") Privacy Policy
</template>

<script lang="ts" setup>
defineProps({
  navigation: {
    type: Array,
    default: () => [],
  },
  contact: {
    type: Object,
    default: () => ({
      description: "",
      tel: "",
      fax: "",
      cel: "",
      email: [],
      address: {
        line_1: "",
        line_2: "",
      },
      schedule: [],
    }),
  },
});
</script>

<style lang="scss">
.aff-footer {
  position: relative;
  z-index: 4;
  background-color: $color-black;
  color: $color-white;

  .sr-text {
    * {
      color: curntColor;
    }
  }

  &-list {
    flex-direction: column;
    > .sr-picture {
      margin-bottom: pxToRem(20);
    }
    > .sr-text {
      text-transform: capitalize;
      margin-bottom: pxToRem(20);
      font-size: pxToRem(14) !important;

      &.title {
        margin-bottom: pxToRem(10);
        font-size: pxToRem(24) !important;
      }
    }
  }

  &-item {
    display: flex;
    align-items: center;

    a {
      color: currentColor;
    }

    .sr-text {
      font-size: pxToRem(12) !important;
      &:not(.email) {
        text-transform: capitalize;
      }
    }

    .sr-icon {
      width: pxToRem(25);
      height: pxToRem(25);
      flex-shrink: 0;
      margin-right: pxToRem(10);
    }
  }

  &-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sr-text,
    a {
      color: currentColor;
      font-size: pxToRem(12) !important;
    }

    &-right,
    &-left {
      display: flex;
      gap: pxToRem(10);
    }
  }
}
</style>
