// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mongo: {
        url: process.env.MONGO_URL,
      },
    },
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  modules: ["sr-content-2", "@vueuse/nuxt", "nuxt-swiper"],
  css: ["@/assets/scss/main.scss"],
  nitro: {
    plugins: ["~/server/DB.ts"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "sr-content-2/assets/scss/utilities/index.scss";
            @import "sr-content-2/assets/scss/main.scss";
            @import "@/assets/scss/tokens.scss"; 
            @import "@/assets/scss/transitions/index.scss"; 
            @import "@/assets/scss/fonts/index.scss";`,
        },
      },
    },
  },
});
