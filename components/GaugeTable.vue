<template lang="pug">
.aff-gauge-table
  .aff-gauge-table-content
    SrText.aff-gauge-table-label(:text="title" class="title text-center")
    table.aff-gauge-table-list
      thead
        tr
          th
            SrText(text="Gauge" class="text-center")
          th
            SrText(text="Thickness" class="text-center")
      tbody
        tr.aff-gauge-table-item(v-for="(item, i) in items" :key="i")
          td
            SrText(:text="item.gauge" class="text-center")
          td(:style="`--thickness: ${2 * (i+1)}px`")
            SrText(:text="item.thickness" class="text-center")
    SrText.aff-gauge-table-note(v-for="(note, i) in notes" :text="note" :key="i")

</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  notes: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
.aff-gauge-table {
  padding-right: 40%;
  color: $color-white;

  &-label {
    margin-bottom: pxToRem(20);
  }

  &-content {
    background-color: $color-aff-blue;
    border-radius: pxToRem(8);
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);
  }

  &-list {
    margin-bottom: pxToRem(10);
    width: 100%;

    thead {
      display: flex;
      border-top: {
        style: solid;
        color: $color-white;
        width: pxToRem(1);
      }
      border-bottom: {
        style: solid;
        color: $color-white;
        width: pxToRem(1);
      }

      tr {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }

    tbody {
      display: flex;
      flex-direction: column;
      tr {
        display: flex;
        justify-content: space-around;
        width: 100%;

        td {
          --thickness: #{pxToRem(1)};
          padding-top: pxToRem(10);
          padding-bottom: pxToRem(10);
          width: 50%;

          &:last-child {
            position: relative;
            padding-right: pxToRem(60);

            &::before,
            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 50%;
              height: var(--thickness);
              width: pxToRem(50);
            }

            &::before {
              transform: translate(0%, -50%);
              background-color: $color-white;
            }
            &::after {
              width: pxToRem(100);
              transform: translate(100%, -50%);
              background-color: $color-aff-blue;
            }
          }
        }
      }
    }
  }

  &-note {
    &.sr-text {
      font-size: pxToRem(14);
      padding-right: pxToRem(20);
      padding-left: pxToRem(20);
    }
  }
}
</style>
