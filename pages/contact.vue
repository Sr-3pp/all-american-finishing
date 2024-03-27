<template lang="pug">
section.aff-contact
    SrContainer()
        SrGrid
            SrGridColumn(:size="{mobile: '1', sm: '1/2'}")
                SrText.contact-title(text="Send us a message" class="title")
                ContactForm
            SrGridColumn(:size="{mobile: '1', sm: '1/2'}")
                ContactOptions.contacts(:only_contact="true")
    .map_container
        .map
            p map
        SrContainer(:with-padding="true")
            ContactOptions.hours(:only_hours="true")
</template>

<script lang="ts">
export default defineComponent({
  setup() {},
});
</script>

<style lang="scss">
.aff-contact {
  padding-top: pxToRem(40);
  > .sr-container {
    &.variant-with-space {
      padding-bottom: 0;
    }

    .sr-grid {
      > * {
        padding-bottom: 0;
      }
    }

    .sr-text {
      &.contact-title {
        color: $color-aff-red;
        margin-bottom: pxToRem(20);
      }
    }
  }
  .contacts {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .hours {
    width: 50%;
  }

  .map_container {
    position: relative;
    background-color: $color-aff-gray;

    .map {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
