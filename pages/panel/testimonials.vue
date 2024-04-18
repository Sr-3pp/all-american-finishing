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

const testimonialModal = ref(null);
const mediaModal = ref(null);
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
  (testimonialModal.value as any).toggle();
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
    (testimonialModal.value as any).toggle();
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
    (testimonialModal.value as any).toggle();
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
  (mediaModal.value as any).elemRef.toggle();
};

const setPicture = (url: string) => {
  if (currentTestimonial.value !== null) {
    testimonials.value.testimonials[Number(currentTestimonial.value)].picture =
      url;
  } else {
    defaultPicture.value = url;
  }
  (mediaModal.value as any).elemRef.toggle();
};
</script>

<template lang="pug">
.aff-testimonials
  SrContainer(:with-padding="true")
    .aff-testimonials-header
      SrText(text="Testimonials" class="title")
      .actions
        button(@click="newTestimonial") Add Testimonial
    AafTable(:data="testimonials.testimonials" :editable="true" @action="runAction")

SrModal(ref="testimonialModal")
  template(#body)
      SrPicture(:src="testimonialPicture" :editable="true" @media-gallery="openMediaGallery")
      SrForm(:fieldsets="testimonalForm" submit="Add Testimonial" @submit="submitHandler")

AafGallery(ref="mediaModal" :gallery="gallery" path="/media/testimonials" @set-picture="setPicture" @delete-picture="gallery.splice($event, 1)" @push-picture="gallery.push($event)")
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
