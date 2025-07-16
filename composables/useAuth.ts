import type { AuthUser, LoginCredentials, RegisterData } from '~/types';

export const useAuth = () => {
  const user = ref<AuthUser | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch<{ user: AuthUser; token: string }>('/api/auth/login', {
        method: 'POST',
        body: credentials
      });

      user.value = data.user;
      
      // Store token in localStorage
      if (process.client) {
        localStorage.setItem('auth_token', data.token);
      }

      await navigateTo('/dashboard');
    } catch (err: any) {
      error.value = err.data?.message || 'Login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: RegisterData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{ user: AuthUser; token: string }>('/api/auth/register', {
        method: 'POST',
        body: data
      });

      user.value = response.user;
      
      // Store token in localStorage
      if (process.client) {
        localStorage.setItem('auth_token', response.token);
      }

      await navigateTo('/dashboard');
    } catch (err: any) {
      error.value = err.data?.message || 'Registration failed';
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    user.value = null;
    
    if (process.client) {
      localStorage.removeItem('auth_token');
    }

    await navigateTo('/');
  };

  const checkAuth = async () => {
    if (process.client) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const data = await $fetch<{ user: AuthUser }>('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          user.value = data.user;
        } catch (err) {
          // Token is invalid, remove it
          localStorage.removeItem('auth_token');
        }
      }
    }
  };

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    register,
    logout,
    checkAuth
  };
};