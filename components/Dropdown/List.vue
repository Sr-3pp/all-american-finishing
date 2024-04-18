<template lang="pug">
SrGrid.aff-dropdown-list
    SrGridColumn(:size="{mobile: '1', sm: with_image ? '1/2' : '1' }")
        ul.aff-dropdown-list-list 
            li(v-for="(item, i) in items" :key="i")
                Dropdown(ref="dropdownGroupEl" v-bind="item" @toggle="toggleContent(i)"
                @input="updateValue(item, $event)"
                @change="updateValue(item, $event)" 
                @delete="deleteElement(content, i)"
                @edit-props="editProps($event, item)"
                @component-list="EmitHandler($event, item, (data: any) =>$emit('component-list', data))"
                @media-gallery="EmitHandler($event, item, (data: any) =>$emit('media-gallery', data))"
                @icon-gallery="EmitHandler($event, item, (data: any) =>$emit('icon-gallery', data))"
              )
    SrGridColumn(:size="{mobile: '1', sm: '1/2'}" v-if="with_image")
        SrPicture.main-img(:class="{changing: changing}" :src="current.image")
</template>

<script lang="ts" setup>
import {
  EmitHandler,
  updateValue,
  deleteElement,
} from "sr-content-2/assets/ts/utilities";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  with_image: {
    type: Boolean,
    default: true,
  },
});

const dropdownGroupEl: Ref<HTMLElement | null> = ref(null);

const current: Ref<any> = ref(props.items.at(0));
const changing: Ref<boolean> = ref(false);
const toggleContent = (idx: number) => {
  console.log("toggleContent", dropdownGroupEl.value);
  (dropdownGroupEl.value as any).forEach((el: any, i: number) => {
    if (i !== idx) {
      el.elemRef.close();
    }
  });
};
const emit = defineEmits([
  "edit-props",
  "component-list",
  "media-gallery",
  "icon-gallery",
]);
const editProps = ($event: any, props: any, component: any) => {
  console.log("editProps", $event, props, component);
  Object.entries(props || {}).forEach(
    ([key, value]: [string, any]) => (props[key] = value)
  );
  EmitHandler($event, component, (data: any) => emit("edit-props", data));
};
</script>

<style lang="scss">
.aff-dropdown-list {
  width: 100%;
  &-list {
    width: 100%;
  }

  .sr-picture.main-img {
    transition: opacity 0.35s ease;
    overflow: hidden;
    border-radius: pxToRem(18);
    &.changing {
      opacity: 0;
    }
    img {
      height: 100%;
    }
  }
}
</style>
