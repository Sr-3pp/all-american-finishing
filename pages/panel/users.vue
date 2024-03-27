<script lang="ts" setup>
definePageMeta({
  layout: "panel",
});
import { fillForm, resetForm } from "~/assets/ts/utilities";

const { data }: any = await useFetch("/api/user");
const { data: users } = data.value;
const userModal = ref(false);
const currentUser = ref(null);
const userForm = ref([
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
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "Password*",
          required: true,
        },
      },
    ],
  },
]);

const runAction = ({ action, idx }: any) => {
  if (action == "delete") {
    deleteUser(users[idx]._id);
  } else if (action == "edit") {
    currentUser.value = users[idx];
    fillForm(userForm, currentUser.value);
    userModal.value = true;
  }
};

const newUser = () => {
  resetForm(userForm);

  userModal.value = true;
};

const updateUser = async (data: any) => {
  try {
    const { data: user }: any = await $fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const idx = users.findIndex((u: any) => u._id === user._id);
    users[idx] = user;
    userModal.value = false;
    resetForm(userForm);
  } catch (error) {
    console.log(error);
  }
};

const sendUser = async (data: any) => {
  if (currentUser.value) {
    return updateUser(data);
  }
  try {
    const { data: user }: any = await $fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
    });
    users.unshift(user);
    userModal.value = false;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id: string) => {
  try {
    await $fetch("/api/user", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    const idx = users.findIndex((user: any) => user._id === id);

    users.splice(idx, 1);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template lang="pug">
.aff-users
  SrContainer(:with-padding="true")
    .aff-users-header
      SrText(text="User List" class="title")
      .acitons
        button(@click="newUser") Add User
    AafTable(:data="users" :editable="true" @action="runAction")

SrModal(:active="userModal" @close="userModal = false")
  template(#body)
    .sr-modal-body
      SrForm(:fieldsets="userForm" submit="Add User" @submit="sendUser")
</template>

<style lang="scss" scoped>
.aff-users {
  .sr-container > * {
    &:not(:last-child) {
      margin-bottom: pxToRem(20);
    }
  }
}
</style>
