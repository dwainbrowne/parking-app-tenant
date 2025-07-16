import type { CachedUser } from '~/types';

export const useCachedUser = () => {
  const STORAGE_KEY = 'parking_user_cache';

  const get = (): CachedUser | null => {
    if (process.client) {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        return cached ? JSON.parse(cached) : null;
      } catch (error) {
        console.error('Error reading cached user:', error);
        return null;
      }
    }
    return null;
  };

  const set = (user: CachedUser): void => {
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        console.error('Error caching user:', error);
      }
    }
  };

  const clear = (): void => {
    if (process.client) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing cached user:', error);
      }
    }
  };

  return {
    get,
    set,
    clear
  };
};