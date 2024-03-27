<template lang="pug">
div.aff-contact-form
    SrForm(:fieldsets="contactForm" @submit="sendMessage" submit="hidden")
      template(#submit)
        AafButton(type="submit" label="Send")
      template(#legal)
        p.aff-contact-form-legal By sending this message, you are accepting the 
          a(href="/") Privacy policy
</template>

<script lang="ts">
export default defineComponent({
  data() {
    const contactForm = [
      {
        fields: [
          {
            component: "SrFormInput",
            props: {
              name: "name",
              placeholder: "Name",
              value: "",
              required: true,
            },
          },
          {
            component: "SrFormInput",
            props: {
              name: "affair",
              placeholder: "Affair",
              value: "",
              required: true,
            },
          },
          {
            component: "SrFormInput",
            props: {
              name: "email",
              type: "email",
              placeholder: "Email",
              value: "",
              required: true,
            },
          },
          {
            component: "SrFormInput",
            props: {
              name: "description",
              type: "textarea",
              placeholder: "Description",
              value: "",
              required: true,
            },
          },
        ],
      },
    ];

    return {
      contactForm,
    };
  },
  methods: {
    sendMessage(data: any) {
      console.log(data);
    },
  },
});
</script>

<style lang="scss">
.aff-contact-form {
  &-legal {
    margin-bottom: pxToRem(20);
    font-size: pxToRem(14);
  }
  .sr-form {
    fieldset {
      padding: 0;
      border: none;
      > .sr-form-input {
        width: 100%;
      }
    }
    &-input {
      --input-border-color: $color-black;
      color: $color-black;
      &-label {
        display: none;
      }
    }
  }
}
</style>
