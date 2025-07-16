export default defineNuxtRouteMiddleware((to) => {
  const { user, checkAuth } = useAuth();

  // Check authentication on client side
  if (process.client) {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return navigateTo('/login');
    }
  }

  // If user is not loaded, check auth
  if (!user.value) {
    checkAuth();
  }
});