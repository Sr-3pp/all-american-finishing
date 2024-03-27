<template lang="pug">
section.aff-contact-banner
    SrContainer(:with-padding="true")
        SrGrid
            SrGridColumn(:size="{mobile: '1', sm: '1/2'}" style="--flex-direction: row")
                SrIcon(name="tel-o")
                div
                    h2 {{ tel }}
                    p ask for <b>free estimate</b>, <br><br> No job is too big or small to us
            SrGridColumn(:size="{mobile: '1', sm: '1/2'}" style="--justify-content: center")
                AafButton.aff-contact-banner-cta(label="Concat us" tag="a" href="/contact" variant="white")
</template>

<script lang="ts">
import { queryContent } from "~/assets/ts/content";

export default defineComponent({
  async setup() {
    const { tel } = await queryContent("_config/contact");

    return {
      tel,
    };
  },
});
</script>

<style lang="scss">
.aff-contact-banner {
  h2 {
    font-family: "aeromatics";
    font-size: pxToRem(30);
  }
  position: relative;
  z-index: 2;
  background-color: $color-aff-red;

  .sr-grid {
    color: $color-white;
    [class*="sr-grid-col-"] {
      display: flex;
      align-items: center;
    }
  }

  .sr-icon {
    width: pxToRem(60);
    height: pxToRem(60);
    margin-right: pxToRem(20);
  }

  .sr-text {
    &.kind {
      &-title {
        margin-bottom: pxToRem(20);
      }
    }
  }

  &-cta {
    margin-left: auto;
  }
}
</style>
