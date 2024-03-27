<script lang="ts" setup>
const props = defineProps({
  gallery: {
    type: Array,
    default: () => [],
  },
  active: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: "/media",
  },
});

const emit = defineEmits([
  "close",
  "set-picture",
  "push-picture",
  "delete-picture",
]);

const newPicture = ref(null);

const addPicture = async ($event: any) => {
  const files = $event.target.files;

  const formData = new FormData();
  formData.append("path", props.path);
  formData.append("file", files[0]);

  try {
    const picture = await $fetch("/api/admin/gallery", {
      method: "PUT",
      body: formData,
    });

    emit("push-picture", picture);
  } catch (error) {
    console.log(error);
  }
};

const deletePicture = (name: string, idx: number) => {
  $fetch("/api/admin/gallery", {
    method: "DELETE",
    body: JSON.stringify({ path: props.path, name }),
  });

  emit("delete-picture", idx);
};
</script>

<template lang="pug">
SrModal.aff-gallery(:active="active" @close="$emit('close')")
  template(#body)
    .sr-modal-body
      .aff-gallery-header
        SrText(text="Gallery" class="title")
        label.aff-gallery-add
          input(type="file" placeholder="Upload" @change="addPicture")
          span Add Picture
      ul.aff-gallery-list
        li.aff-gallery-item(v-for="(picture, i) in gallery" :key="i")
          button.aff-gallery-item-delete(@click="deletePicture(picture, i)")
            SrIcon(name="trash-o")
          button(@click="$emit('set-picture', `${path}/${picture}`)")
            img(:src="`${path}/${picture}`" :alt="picture")
</template>

<style lang="scss" scoped>
.aff-gallery {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);
  }

  &-add {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-aff-red;
    width: pxToRem(200);
    padding: pxToRem(10);
    border-radius: pxToRem(4);
    color: $color-white;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(10);
  }
  &-item {
    position: relative;
    width: pxToRem(200);
    height: pxToRem(200);

    button {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      border-radius: pxToRem(20);
      padding: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-delete {
      position: absolute;
      top: pxToRem(-15);
      right: pxToRem(-15);
      background-color: $color-aff-red !important;
      width: pxToRem(30) !important;
      height: pxToRem(30) !important;
      font-family: "aeromatics";
      color: $color-white;
      border: none;
      border-radius: pxToRem(40);
      cursor: pointer;
      z-index: 2;

      .sr-icon {
        width: pxToRem(20);
        height: pxToRem(20);
      }
    }
  }
}
</style>
