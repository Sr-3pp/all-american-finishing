<template lang="pug">
SrTabs.aff-tabs(
  @new-item="newItem"
  )
    template(#item="{current, toggle}")
        li.sr-tabs-item(
          v-for="({label}, i) in tabs"
            :class="{active: current == i}"
            @click="toggle(i)"
        )
            SrIcon(:name="label.icon")
            span {{label.name}}
    template(#content="{current}")
        template(v-for="({content}, i) in tabs" :key="i" )
            Transition(name="fade")
                li.sr-tabs-content(v-show="current == i")
                    component(
                        v-for="(item, e) in content"
                        v-bind="item.props"
                        :is="item.component"
                        :key="e"
                        @input="updateValue(item, $event)"
                        @change="updateValue(item, $event)"
                        @toggle="updateValue(item, $event)"
                        @delete="deleteElement(content, i)"
                        @edit-props="editProps"
                        @component-list="EmitHandler($event, item, (data: any) =>$emit('component-list', data))"
                        @media-gallery="EmitHandler($event, item, (data: any) =>$emit('media-gallery', data))"
                        @icon-gallery="EmitHandler($event, item, (data: any) =>$emit('icon-gallery', data))"
                    )
                    button(@click="EmitHandler(null, tabs[current], (data: any) =>$emit('component-list', data))")
                      SrText(text="add component")
</template>

<script lang="ts" setup>
import {
  EmitHandler,
  updateValue,
  deleteElement,
} from "sr-content-2/assets/ts/utilities";

const props: any = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
});

const newItem = (item: any) => {
  console.log(item);
  props.tabs.push({
    label: {
      name: item.label,
      icon: "sierra-o",
    },
    content: item.content,
  });
};

const emit = defineEmits([
  "edit-props",
  "component-list",
  "media-gallery",
  "icon-gallery",
]);

const editProps = ($event: any, props: any, component: any) => {
  Object.entries(props || {}).forEach(
    ([key, value]: [string, any]) => (component.props[key] = value)
  );
  EmitHandler($event, component, (data: any) => emit("edit-props", data));
};
</script>

<style lang="scss">
.aff-tabs {
  .sr-tabs {
    &-items {
      align-items: flex-end;
      overflow: hidden;
    }
    &-item {
      display: flex;
      align-items: center;
      background-color: rgba($color: $color-aff-blue, $alpha: 0.25);
      border: none;
      color: $color-white;
      padding: pxToRem(8) pxToRem(10);
      border-radius: pxToRem(16);
      font-style: italic;
      font-weight: bold;
      font-size: pxToRem(14);
      width: calc(100% / 6);
      min-height: pxToRem(70);
      flex-shrink: 1;
      transition: padding 0.35s ease, min-height 0.35s ease;
      position: relative;
      bottom: 0;

      span {
        border: none !important;
      }

      &.active,
      &:hover {
        min-height: pxToRem(90);
        padding-top: pxToRem(16);
        padding-bottom: pxToRem(16);
      }

      &:not(:last-child) {
        margin-right: pxToRem(20);
      }

      .sr-icon {
        margin-right: pxToRem(2);
        width: 30%;
        aspect-ratio: 1 / 1;
        flex-shrink: 0;
        svg {
          stroke: currentColor;
        }
      }
    }

    &-contents {
      padding-top: pxToRem(40);
      padding-bottom: pxToRem(40);
    }
  }
}
</style>
