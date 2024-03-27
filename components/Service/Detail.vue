<template lang="pug">
SrGrid.aff-service-detail
    SrGridColumn(:size="{mobile: '1', sm: '1/2'}" v-for="(item, i) in items" :key="i")
        SrText(:text="item.title" class="title")
        ul.aff-service-detail-list(v-if="item.list")
            li.aff-service-detail-list-item(v-for="(litem, e) in item.list" :key="e")
                details(name="list" :open="e == 0")
                    summary
                        SrText(:text="litem.label")
                    SrText(:text="litem.content")
        SrText(:text="item.description")
</template>

<script lang="ts">
export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.aff-service-detail {
  width: 100%;

  .sr-text {
    &.title {
      width: auto;
      flex-grow: 0;
      margin-right: auto;
      margin-bottom: pxToRem(20);

      border: {
        style: solid;
        color: $color-black;
        width: pxToRem(1);
        radius: pxToRem(8);
      }

      padding: pxToRem(20);
    }
  }

  &-list {
    margin-bottom: pxToRem(20);

    &-item {
      color: $color-aff-gray;
      padding: pxToRem(10);
      padding-left: pxToRem(16);
      position: relative;

      details {
        summary {
          display: flex;
          align-items: center;
          &::before {
            content: "-";
            font-size: pxToRem(30);
            font-weight: bold;
            margin-right: pxToRem(10);
          }
          list-style: none;
          &::-webkit-details-marker {
            display: none;
          }
        }
        > .sr-text {
          padding-left: pxToRem(30);
        }

        &[open] {
          summary {
            &::before {
              content: "+";
            }
          }
        }
      }
    }
  }
}
</style>
