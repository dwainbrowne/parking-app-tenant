import type { GuestReservation } from '~/types';

export const useReservations = () => {
  const reservations = ref<GuestReservation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchReservations = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('auth_token') : null;
      const data = await $fetch<{ reservations: GuestReservation[] }>('/api/reservations', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      reservations.value = data.reservations;
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch reservations';
    } finally {
      isLoading.value = false;
    }
  };

  const createReservation = async (reservation: Omit<GuestReservation, 'id' | 'createdAt' | 'status'>) => {
    isLoading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('auth_token') : null;
      const data = await $fetch<{ reservation: GuestReservation }>('/api/reservations', {
        method: 'POST',
        body: reservation,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      reservations.value.unshift(data.reservation);
      return data.reservation;
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to create reservation';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const cancelReservation = async (reservationId: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('auth_token') : null;
      await $fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      reservations.value = reservations.value.filter(r => r.id !== reservationId);
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to cancel reservation';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    reservations: readonly(reservations),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchReservations,
    createReservation,
    cancelReservation
  };
};