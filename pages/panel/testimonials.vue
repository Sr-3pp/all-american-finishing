<script lang="ts" setup>
definePageMeta({
  layout: "panel",
});
import { fillForm, resetForm } from "~/assets/ts/utilities";
import { queryContent } from "~/assets/ts/content";

const { content } = await queryContent("/_testimonials");
const testimonials = ref(content);

const { data } = await useFetch("/api/admin/gallery", {
  method: "POST",
  body: JSON.stringify({ path: "testimonials" }),
});
const gallery = ref(data);

const defaultPicture = ref("/media/testimonials/default.jpg");
const currentTestimonial = ref(null);

const mediaGallery = ref(false);
const testimonialModal = ref(false);
const testimonalForm = ref([
  {
    fields: [
      {
        component: "SrFormInput",
        props: {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "Your Name",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          label: "Date",
          name: "date",
          type: "date",
          placeholder: "Testimonial date",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          label: "Testimonial",
          name: "testimonial",
          type: "textarea",
          placeholder: "Your Testimonial",
          required: true,
        },
      },
    ],
  },
]);

const testimonialPicture = computed(() => {
  return currentTestimonial.value !== null
    ? testimonials.value.testimonials[Number(currentTestimonial.value)].picture
    : defaultPicture.value;
});

const newTestimonial = () => {
  currentTestimonial.value = null;
  resetForm(testimonalForm);
  testimonialModal.value = true;
};

const updateTestimonial = (data: any) => {
  const testimonial =
    testimonials.value.testimonials[Number(currentTestimonial.value)];
  data.picture
    ? null
    : (data.picture = testimonial.picture || "https://via.placeholder.com/150");
  testimonials.value.testimonials[Number(currentTestimonial.value)] = data;
  sendTestimonial();
};

const addTestimonial = (data: any) => {
  data.picture ? null : (data.picture = defaultPicture.value);
  testimonials.value.testimonials.push(data);
  sendTestimonial();
};

const deleteTestimonial = () => {
  if (!confirm("Are you sure?")) return;
  testimonials.value.testimonials.splice(currentTestimonial.value, 1);
  currentTestimonial.value = null;
  sendTestimonial();
};

const sendTestimonial = async () => {
  try {
    await $fetch("/api/content", {
      method: "PUT",
      body: {
        path: "/_testimonials",
        content: testimonials.value,
      },
    });
    testimonialModal.value = false;
  } catch (error) {
    console.log(error);
  }
};

const runAction = ({ action, idx }: any) => {
  currentTestimonial.value = idx;
  if (action == "delete") {
    deleteTestimonial();
  } else if (action == "edit") {
    fillForm(testimonalForm, testimonials.value.testimonials[idx], ["picture"]);
    testimonialModal.value = true;
  }
};

const submitHandler = (data: any) => {
  if (currentTestimonial.value !== null) {
    updateTestimonial(data);
  } else {
    addTestimonial(data);
  }
};

const openMediaGallery = () => {
  mediaGallery.value = true;
};

const setPicture = (url: string) => {
  if (currentTestimonial.value !== null) {
    testimonials.value.testimonials[Number(currentTestimonial.value)].picture =
      url;
  } else {
    defaultPicture.value = url;
  }
  mediaGallery.value = false;
};

watch(
  () => testimonialModal.value,
  (val) => {
    if (!val) {
      currentTestimonial.value = null;
      defaultPicture.value = "/media/default.jpg";
    }
  }
);
</script>

<template lang="pug">
.aff-testimonials
  SrContainer(:with-padding="true")
    .aff-testimonials-header
      SrText(text="Testimonials" class="title")
      .actions
        button(@click="newTestimonial") Add Testimonial
    AafTable(:data="testimonials.testimonials" :editable="true" @action="runAction")

SrModal(:active="testimonialModal" @close="testimonialModal = false")
  template(#body)
    .sr-modal-body
      SrPicture(:src="testimonialPicture" :editable="true" @media-gallery="openMediaGallery")
      SrForm(:fieldsets="testimonalForm" submit="Add Testimonial" @submit="submitHandler")

AafGallery(:gallery="gallery" path="/media/testimonials" :active="mediaGallery" @set-picture="setPicture" @delete-picture="gallery.splice($event, 1)" @push-picture="gallery.push($event)" @close="mediaGallery = false")
</template>

<style lang="scss" scoped>
.aff-testimonials {
  .sr-container > * {
    &:not(:last-child) {
      margin-bottom: pxToRem(20);
    }
  }
}
</style>
