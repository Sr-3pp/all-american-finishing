<script lang="ts" setup>
const props: any = defineProps({
  data: {
    type: Array,
    default: [],
  },
  excludeColumns: {
    type: Array,
    default: () => [
      "_id",
      "createdAt",
      "updatedAt",
      "__v",
      "password",
      "thumbs",
    ],
  },
  editable: {
    type: Boolean,
    default: false,
  },
  hideButtons: {
    type: Array,
    default: () => [],
  },
});

const keys = Object.keys(props.data[0] || {});
</script>

<template lang="pug">
table.aff-table
  thead(v-if="data.length > 0")
    tr
      template(v-for="(item, i) in keys" :key="i")
        th(v-if="!excludeColumns.includes(item)") {{ item }}
      th(v-if="editable") Actions
  tbody(v-if="data.length > 0")
    tr(v-for="(item, i) in data" :key="i")
      template(v-for="(value, j) in item" :key="j")
        td(v-if="!excludeColumns.includes(j)") {{ value }}
      td.aff-table-actions(v-if="editable")
        button(@click="$emit('action', {action: 'delete', idx: i})" v-if="!hideButtons.includes('delete')")
          SrIcon(name="trash-o")
        button(@click="$emit('action', {action: 'edit', idx: i})" v-if="!hideButtons.includes('edit')")
          SrIcon(name="cog-o")
</template>

<style lang="scss" scoped>
.aff-table {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: pxToRem(10);
    text-align: center;
  }

  th {
    text-transform: capitalize;
  }

  tbody tr {
    &:nth-child(odd) {
      background-color: $color-aff-blue;
      color: $color-white;
      .aff-table-actions {
        .sr-icon {
          color: $color-white;
        }
      }
    }
  }
  &-actions {
    display: flex;
    justify-content: center;
    gap: pxToRem(10);
    button {
      padding: pxToRem(4);
      background-color: transparent;
      color: $color-white;
      border: none;
    }
    .sr-icon {
      width: pxToRem(20);
      height: pxToRem(20);
      color: $color-black;
    }
  }
}
</style>
