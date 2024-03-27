<script lang="ts" setup>
const title = ref("Rank Us");
const rank = ref(0);
const ranked = ref(false);
const sent = ref(false);
const error = ref({
  message: "",
  status: false,
});
const rankForm = ref([
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
          label: "E-mail",
          name: "email",
          type: "email",
          placeholder: "Email*",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          label: "Message",
          name: "message",
          type: "textarea",
          placeholder: "Message*",
          required: true,
        },
      },
    ],
  },
]);

const isActive = (idx: number) => {
  return idx <= rank.value;
};

const sendRank = async (data: any) => {
  if (!ranked.value) {
    error.value = { message: "You must select a rank", status: true };
    return;
  }

  const actualRank = { ...data, score: rank.value };

  try {
    const rank = await $fetch("/api/rank", {
      method: "POST",
      body: actualRank,
    });
    sent.value = true;
    console.log(rank);
  } catch (err) {
    console.error(err);
    error.value = { message: "Error sending the rank", status: true };
  }
};

const setRank = (idx: number) => {
  ranked.value = true;
  rank.value = idx;
};

watch(rank, () => {
  const labels = ["The Worst", "Bad", "Regular", "Good", "Excellent"];
  title.value = labels[rank.value - 1] || "Rank Us";
});
</script>

<template lang="pug">
.aff-rank
  SrContainer(:with-padding="true" v-if="!sent")
    SrText(v-if="error.status" :text="error.message" class="subtitle error-message" style="--text-align: center;")
    SrText(:text="title" class="title" style="--text-align: center;")
    ul.aff-rank-list
      li.aff-rank-item(
        v-for="i in 5"
        :key="i"
        :class="{active: isActive(i)}"
        @mouseover="!ranked ? rank = i : null"
        @mouseout="!ranked ? rank = 0 : null"
        @click="setRank(i)"
      )
        SrIcon(name="star-f" class="sr-icon")
    SrText(text="For us, your opinion is the most important, tell us what do you think about our service and how we could improve it." style="--text-align: center;")
    SrForm(:fieldsets="rankForm" @submit="sendRank" submit="hidden")
      template(#submit)
        AafButton(label="Send" variant="white")
  SrContainer(:with-padding="true" v-else)
    SrText(text="Thank you for your feedback.\n\nWe will take it into account to improve our service." class="title" style="--text-align: center;")
</template>

<style lang="scss">
.aff-rank {
  position: relative;
  .error-message {
    position: absolute;
    top: 0;
    left: 0;
    margin-bottom: pxToRem(40);
  }
  .sr-text {
    margin-bottom: pxToRem(40);
  }
  &-list {
    display: flex;
    justify-content: center;
    padding: pxToRem(20);
    max-width: pxToRem(500);
    margin: auto;
    margin-bottom: pxToRem(40);
  }
  &-item {
    width: 20%;
    &.active {
      .sr-icon {
        color: $color-white;
      }
    }
  }
  .sr-icon {
    width: pxToRem(50);
    height: pxToRem(50);
    color: $color-aff-red;
    margin: auto;
    svg {
      stroke: $color-white;
    }
  }

  .sr-form {
    display: flex;
    flex-direction: column;
    fieldset {
      border: none;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      .sr-form-input {
        width: calc(50% - pxToRem(5));
        &-label {
          display: none;
        }
      }
    }
    .aaf-button {
      margin: auto;
      min-width: pxToRem(250);
    }
  }
  .title {
    margin-bottom: pxToRem(20);
  }
}
</style>
