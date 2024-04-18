<template lang="pug">
SrAccordion.aff-dropdown(ref="affDropdown" :isOpen="isOpen" @toggle="$emit('toggle')")
    template(#label)
        .sr-accordion-label
            SrIcon.star-icon(name="star-f")
            span {{ label.name }}
            SrIcon(:name="label.icon")
    template(#content)
        component(v-for="(item, i) in content" :key="i" v-bind="item.props" :is="item.component"
        @input="updateValue(item, $event)"
        @change="updateValue(item, $event)"
        @toggle="updateValue(item, $event)"
        @delete="deleteElement(content, i)"
        @edit-props="editProps($event, item)"
        @component-list="EmitHandler($event, item, (data: any) =>$emit('component-list', data))"
        @media-gallery="EmitHandler($event, item, (data: any) =>$emit('media-gallery', data))"
        @icon-gallery="EmitHandler($event, item, (data: any) =>$emit('icon-gallery', data))"
        )

</template>

<script lang="ts" setup>
import {
  EmitHandler,
  updateValue,
  deleteElement,
} from "sr-content-2/assets/ts/utilities";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  label: {
    type: Object,
    default: () => {},
  },
  content: {
    type: Array,
    default: () => [],
  },
});

const affDropdown = ref(null);

const emit = defineEmits([
  "toggle",
  "edit-props",
  "component-list",
  "media-gallery",
  "icon-gallery",
]);

const editProps = ($event: any, component: any) => {
  Object.entries(props || {}).forEach(
    ([key, value]: [string, any]) => (component.props[key] = value)
  );
  EmitHandler($event, component, (data: any) => emit("edit-props", data));
};

defineExpose({
  elemRef: affDropdown,
});
</script>

<style lang="scss">
.aff-dropdown.sr-accordion {
  border: none;
  .sr-accordion-label {
    display: flex;
    align-items: center;
    font-style: italic;
    font-size: pxToRem(20);
    font-weight: bold;
    background-color: transparent !important;
    border: none;
    width: 100%;

    padding-top: pxToRem(10);
    padding-bottom: pxToRem(10);

    .sr-accordion-label-chevron {
      display: none;
    }

    .sr-icon {
      width: pxToRem(30);
      height: pxToRem(30);
      margin-left: auto;
      transition: transform 0.35s ease;

      &:not(.star-icon) {
        color: $color-white;
        background-color: $color-aff-red;
        border-radius: pxToRem(8);
        padding: pxToRem(4);
      }
    }

    .star-icon {
      width: pxToRem(20);
      height: pxToRem(20);
      margin-left: 0;
      margin-right: pxToRem(10);
      transition: transform 0.35s ease, color 0.35s ease;
    }

    &:hover {
      .star-icon {
        transform: rotate(180deg);
        color: $color-aff-blue;
      }
      > span {
        color: $color-aff-blue;
      }
    }
  }

  .sr-accordion-content {
    border-bottom: {
      style: solid;
      color: $color-aff-gray;
      width: pxToRem(1);
    }
  }

  &.open {
    .sr-accordion {
      &-label {
        .sr-icon:not(.star-icon) {
          transform: rotate(180deg);
        }

        .star-icon {
          transform: rotate(180deg);
          color: $color-aff-blue;
        }
        > span {
          color: $color-aff-blue;
        }
      }

      &-content {
        padding-top: pxToRem(10);
        padding-bottom: pxToRem(10);
      }
    }
  }
}
</style>
