<template lang="pug">
.aff-newsletter
    SrText.aff-newsletter-label(text="Subscribe to our newsletter" class="subtitle") 
    SrFormInput(placeholder="Your Email" v-model="email" type="email")
    AafButton(label="subscribe" @click="subscribe")
</template>

<script setup lang="ts">
const email = ref("");

const subscribe = () => {
  console.log(email.value);
};
</script>

<style lang="scss">
.aff-newsletter {
  &-label {
    margin-bottom: pxToRem(10);
  }
  .sr-form-input {
    --input-border-color: $color-black;
    &-label {
      display: none;
    }
  }
  .aaf-button {
    margin-top: pxToRem(10);
  }
}
</style>
