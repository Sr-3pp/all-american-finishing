<script lang="ts" setup>
definePageMeta({
  layout: "panel",
});

import type { Product } from "~/types";
import { fillForm, resetForm } from "~/assets/ts/utilities";

const { data }: any = await useFetch("/api/catalog");
const { data: catalog } = data.value;
const catalogModal: Ref<Boolean> = ref(false);

const thumbs: Ref<Array<string>> = ref([]);
const thumbFiles: Ref<Array<any>> = ref([]);

const currentProduct: any = ref(null);

const openModal = () => {
  catalogModal.value = true;
};

const updateProduct = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key == "thumbFiles") {
      data[key].forEach((thf: any, idx: number) => {
        formData.append(`${key}_${idx}`, thf);
      });
    } else if (key === "dimensions") {
      Object.keys(data[key]).forEach((dim) => {
        formData.append(`dimensions.${dim}`, data[key][dim]);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  formData.append("_id", currentProduct.value._id);
  currentProduct.value.thumbs.forEach((thumb: any, idx: number) => {
    if (!thumb.includes("data:image")) {
      formData.append(`thumb_${idx}`, thumb);
    }
  });

  $fetch(`/api/catalog`, {
    method: "PUT",
    body: formData,
  });

  currentProduct.value = null;
  catalogModal.value = false;
};

const addProduct = async (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "thumbFiles") {
      data[key].forEach((file: any, idx: number) => {
        formData.append(`thumbFiles_${idx}`, file);
      });
    } else if (key == "dimensions") {
      Object.keys(data[key]).forEach((k) => {
        formData.append(`dimensions_${k}`, data[key][k]);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  try {
    const { data: product }: any = await $fetch("/api/catalog", {
      method: "POST",
      body: formData,
    });
    catalog?.push(product as any);
    catalogModal.value = false;
    thumbs.value = [];
    thumbFiles.value = [];
    resetForm(catalogForm);
  } catch (error) {
    console.log(error);
  }
};

const submitHandler = (data: any) => {
  if (thumbFiles.value.length > 0) {
    data.thumbFiles = thumbFiles.value;
  }
  if (currentProduct.value) {
    return updateProduct(data);
  }

  return addProduct(data);
};

const deleteProduct = async (idx: number) => {
  if (!confirm("Are you sure?")) return;

  const { _id }: any = catalog[idx];
  await $fetch("/api/catalog", {
    method: "DELETE",
    body: { _id },
  });

  catalog.splice(idx, 1);
};

const runAction = ({ action, idx }: any) => {
  if (action == "delete") {
    deleteProduct(idx);
  } else if (action == "edit") {
    currentProduct.value = catalog[idx];
    fillForm(catalogForm, currentProduct.value);
    catalogModal.value = true;
  }
};

const catalogForm = ref([
  {
    fields: [
      {
        component: "SrFormInput",
        props: {
          placeholder: "Name",
          name: "name",
          required: true,
          value: "",
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Price",
          name: "price",
          type: "number",
          required: true,
          value: "",
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Width",
          name: "dimensions.width",
          type: "number",
          required: true,
          value: "",
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Height",
          name: "dimensions.height",
          type: "number",
          required: true,
          value: "",
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Length",
          name: "dimensions.length",
          type: "number",
          required: true,
          value: "",
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Description",
          name: "description",
          type: "textarea",
          required: true,
          value: "",
        },
      },
    ],
  },
]);

const previewThumbs = (e: any) => {
  const files: any = e.target.files;
  thumbs.value = [];
  for (let i = 0; i < files.length; i++) {
    thumbFiles.value.push(files[i]);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      currentProduct.value
        ? currentProduct.value.thumbs.push(e.target?.result)
        : thumbs.value.push(e.target.result);
    };
    reader.readAsDataURL(files[i]);
  }
};

const deleteThumb = (idx: number) => {
  if (currentProduct.value) {
    currentProduct.value.thumbs.splice(idx, 1);
  } else {
    thumbs.value.splice(idx, 1);
    thumbFiles.value.splice(idx, 1);
  }
};
</script>

<template lang="pug">
.aff-catalog
  SrContainer(:with-padding="true")
    .aff-catalog-header
      SrText(text="Catalog")
      button(@click="openModal") Add
    AafTable(:data="catalog" :editable="true" @action="runAction")
  SrModal(:active="catalogModal" @close="catalogModal = false")
    template(#body)
      .sr-modal-body
        SrForm(:fieldsets="catalogForm" submit="Add" @submit="submitHandler")
          template(#legal)
            ul.aff-catalog-thumbs
              li.aff-catalog-thumb
                label
                  input(type="file" accept="image/*" multiple @change="previewThumbs")
                  span Add Thumbs
              li.aff-catalog-thumb(v-for="(thumb, i) in currentProduct ? currentProduct.thumbs : thumbs" :key="i")
                button.aff-catalog-thumb-delete(@click="deleteThumb(i)" type="button")
                  SrIcon(name="trash-o")
                SrPicture(:src="thumb")
</template>

<style lang="scss">
.aff-catalog {
  &-thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(10);
  }

  &-thumb {
    width: pxToRem(100);
    height: pxToRem(100);
    position: relative;

    &-delete {
      position: absolute;
      z-index: 1;
      top: pxToRem(-10);
      right: pxToRem(-10);
      padding: pxToRem(8);
      background-color: $color-aff-red;
      border: none;
      border-radius: pxToRem(50);
      .sr-icon {
        color: $color-white;
        width: pxToRem(20);
        height: pxToRem(20);
      }
    }
    .sr-picture {
      border-radius: pxToRem(10);
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
