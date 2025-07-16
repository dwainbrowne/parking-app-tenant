import type { Vehicle } from '~/types';

export const useVehicles = () => {
  const vehicles = ref<Vehicle[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchVehicles = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('auth_token') : null;
      const data = await $fetch<{ vehicles: Vehicle[] }>('/api/vehicles', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      vehicles.value = data.vehicles;
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch vehicles';
    } finally {
      isLoading.value = false;
    }
  };

  const addVehicle = async (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => {
    isLoading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('auth_token') : null;
      const data = await $fetch<{ vehicle: Vehicle }>('/api/vehicles', {
        method: 'POST',
        body: vehicle,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      vehicles.value.push(data.vehicle);
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to add vehicle';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const removeVehicle = async (vehicleId: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const token = process.client ? localStorage.getItem('auth_token') : null;
      await $fetch(`/api/vehicles/${vehicleId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      vehicles.value = vehicles.value.filter(v => v.id !== vehicleId);
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to remove vehicle';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    vehicles: readonly(vehicles),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchVehicles,
    addVehicle,
    removeVehicle
  };
};