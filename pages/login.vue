<script lang="ts" setup>
const auth = useAuth();

if (auth.isLoggedIn) {
  useRouter().push("/panel");
}

const loginForm = ref([
  {
    fields: [
      {
        component: "SrFormInput",
        props: {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "Email",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          type: "password",
          name: "password",
          label: "Password",
          placeholder: "Password",
          required: true,
        },
      },
    ],
  },
]);

const login = async (e: any) => {
  try {
    const {
      data: { user, token },
    } = await $fetch("/api/auth/login", {
      method: "POST",
      body: e,
    });

    if (!user) {
      return;
    }

    auth.login(user, token);
    useRouter().push("/panel");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template lang="pug">
.aff-login
  SrContainer(:with-padding="true")
    SrForm(:fieldsets="loginForm" @submit="login" submit="Login" v-if="!auth.isLoggedIn")
</template>

<style scoped></style>
