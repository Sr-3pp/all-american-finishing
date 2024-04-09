export default defineNuxtRouteMiddleware((to, from) => {
  if (to.meta.layout === "panel") {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
      return navigateTo("/login");
    }
  }
});
