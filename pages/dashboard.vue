<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-semibold text-gray-900">Parking Portal</h1>
            <span v-if="user" class="text-sm text-gray-500">Unit {{ user.unitNumber }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <span v-if="user" class="text-sm text-gray-700">{{ user.name }}</span>
            <button @click="logout" class="text-sm text-gray-500 hover:text-gray-700">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <!-- Tab Navigation -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'">
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <!-- Stats Cards -->
            <div class="card">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12m-6 0h6" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Registered Vehicles</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ vehicles.length }}</p>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Active Reservations</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ activeReservations.length }}</p>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Monthly Usage</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ monthlyUsage }}/5</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div v-if="recentReservations.length === 0" class="text-gray-500 text-center py-8">
              No recent activity
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="reservation in recentReservations"
                :key="reservation.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="font-medium text-gray-900">{{ reservation.guestName }}</p>
                  <p class="text-sm text-gray-600">{{ reservation.vehicle.licensePlate }} • {{ formatDate(reservation.reservationStart) }}</p>
                </div>
                <span :class="getStatusBadgeClass(reservation.status)">
                  {{ reservation.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Vehicles Tab -->
        <div v-if="activeTab === 'vehicles'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-900">My Vehicles</h2>
            <button @click="showAddVehicle = true" class="btn-primary">
              Add Vehicle
            </button>
          </div>

          <div v-if="vehicles.length === 0" class="card text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12m-6 0h6" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No vehicles registered</h3>
            <p class="text-gray-600 mb-4">Add your first vehicle to get started</p>
            <button @click="showAddVehicle = true" class="btn-primary">
              Add Vehicle
            </button>
          </div>

          <div v-else class="grid md:grid-cols-2 gap-6">
            <div
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              class="card"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ vehicle.licensePlate }}</h3>
                  <p class="text-gray-600">{{ vehicle.make }} {{ vehicle.model }}</p>
                  <p class="text-sm text-gray-500">{{ vehicle.color }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span v-if="vehicle.isPrimary" class="badge badge-info">Primary</span>
                  <button
                    @click="removeVehicle(vehicle.id!)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Guest Parking Tab -->
        <div v-if="activeTab === 'guest-parking'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-900">Guest Parking</h2>
            <button @click="showAddReservation = true" class="btn-primary">
              New Reservation
            </button>
          </div>

          <!-- Usage Limit -->
          <div class="card mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Monthly Usage</h3>
                <p class="text-gray-600">{{ monthlyUsage }} of 5 reservations used this month</p>
              </div>
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  :style="{ width: `${(monthlyUsage / 5) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Reservations List -->
          <div v-if="reservations.length === 0" class="card text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No reservations yet</h3>
            <p class="text-gray-600 mb-4">Create your first guest parking reservation</p>
            <button @click="showAddReservation = true" class="btn-primary">
              New Reservation
            </button>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="reservation in reservations"
              :key="reservation.id"
              class="card"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ reservation.guestName }}</h3>
                    <span :class="getStatusBadgeClass(reservation.status)">
                      {{ reservation.status }}
                    </span>
                  </div>
                  <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Vehicle:</strong> {{ reservation.vehicle.licensePlate }}</p>
                      <p><strong>Make/Model:</strong> {{ reservation.vehicle.make }} {{ reservation.vehicle.model }}</p>
                    </div>
                    <div>
                      <p><strong>Start:</strong> {{ formatDateTime(reservation.reservationStart) }}</p>
                      <p><strong>End:</strong> {{ formatDateTime(reservation.reservationEnd) }}</p>
                    </div>
                  </div>
                  <p v-if="reservation.notes" class="text-sm text-gray-600 mt-2">
                    <strong>Notes:</strong> {{ reservation.notes }}
                  </p>
                </div>
                <div v-if="reservation.status === 'pending' || reservation.status === 'approved'" class="ml-4">
                  <button
                    @click="cancelReservation(reservation.id!)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Vehicle Modal -->
    <div v-if="showAddVehicle" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Add Vehicle</h2>
            <button @click="showAddVehicle = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleAddVehicle" class="space-y-4">
            <div>
              <label class="form-label">License Plate</label>
              <input
                v-model="vehicleForm.licensePlate"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div>
              <label class="form-label">Make</label>
              <input
                v-model="vehicleForm.make"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div>
              <label class="form-label">Model</label>
              <input
                v-model="vehicleForm.model"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div>
              <label class="form-label">Color</label>
              <input
                v-model="vehicleForm.color"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div class="flex items-center">
              <input
                v-model="vehicleForm.isPrimary"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label class="ml-2 text-sm text-gray-700">Primary vehicle</label>
            </div>
            <div class="flex space-x-3">
              <button type="submit" class="btn-primary flex-1">Add Vehicle</button>
              <button type="button" @click="showAddVehicle = false" class="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Reservation Modal -->
    <div v-if="showAddReservation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">New Guest Reservation</h2>
            <button @click="showAddReservation = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleAddReservation" class="space-y-4">
            <div>
              <label class="form-label">Guest Name</label>
              <input
                v-model="reservationForm.guestName"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div>
              <label class="form-label">Guest Phone (Optional)</label>
              <input
                v-model="reservationForm.guestPhone"
                type="tel"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">License Plate</label>
              <input
                v-model="reservationForm.vehicle.licensePlate"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Make</label>
                <input
                  v-model="reservationForm.vehicle.make"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              <div>
                <label class="form-label">Model</label>
                <input
                  v-model="reservationForm.vehicle.model"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
            </div>
            <div>
              <label class="form-label">Color</label>
              <input
                v-model="reservationForm.vehicle.color"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Start Date/Time</label>
                <input
                  v-model="reservationForm.reservationStart"
                  type="datetime-local"
                  class="form-input"
                  required
                />
              </div>
              <div>
                <label class="form-label">End Date/Time</label>
                <input
                  v-model="reservationForm.reservationEnd"
                  type="datetime-local"
                  class="form-input"
                  required
                />
              </div>
            </div>
            <div>
              <label class="form-label">Notes (Optional)</label>
              <textarea
                v-model="reservationForm.notes"
                class="form-input"
                rows="3"
              ></textarea>
            </div>
            <div class="flex space-x-3">
              <button type="submit" class="btn-primary flex-1">Create Reservation</button>
              <button type="button" @click="showAddReservation = false" class="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Vehicle, GuestReservation } from '~/types';

// Meta
useHead({
  title: 'Dashboard - Parking Enforcement Portal'
});

// Middleware
definePageMeta({
  middleware: 'auth'
});

// Composables
const { user, logout } = useAuth();
const { vehicles, fetchVehicles, addVehicle, removeVehicle } = useVehicles();
const { reservations, fetchReservations, createReservation, cancelReservation } = useReservations();

// Reactive state
const activeTab = ref('overview');
const showAddVehicle = ref(false);
const showAddReservation = ref(false);

// Form data
const vehicleForm = reactive({
  licensePlate: '',
  make: '',
  model: '',
  color: '',
  isPrimary: false
});

const reservationForm = reactive({
  guestName: '',
  guestPhone: '',
  vehicle: {
    licensePlate: '',
    make: '',
    model: '',
    color: ''
  },
  reservationStart: '',
  reservationEnd: '',
  notes: ''
});

// Tabs configuration
const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'vehicles', name: 'My Vehicles' },
  { id: 'guest-parking', name: 'Guest Parking' }
];

// Computed properties
const activeReservations = computed(() => {
  return reservations.value.filter(r => 
    r.status === 'approved' && new Date(r.reservationEnd) > new Date()
  );
});

const recentReservations = computed(() => {
  return reservations.value
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
});

const monthlyUsage = computed(() => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return reservations.value.filter(r => 
    new Date(r.createdAt) >= startOfMonth
  ).length;
});

// Methods
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};

const formatDateTime = (date: Date | string) => {
  return new Date(date).toLocaleString();
};

const getStatusBadgeClass = (status: string) => {
  const classes = {
    pending: 'badge badge-warning',
    approved: 'badge badge-success',
    denied: 'badge badge-danger',
    expired: 'badge badge-info'
  };
  return classes[status as keyof typeof classes] || 'badge';
};

const handleAddVehicle = async () => {
  try {
    await addVehicle({
      ...vehicleForm,
      licensePlate: vehicleForm.licensePlate.toUpperCase()
    });
    
    // Reset form
    Object.assign(vehicleForm, {
      licensePlate: '',
      make: '',
      model: '',
      color: '',
      isPrimary: false
    });
    
    showAddVehicle.value = false;
  } catch (error) {
    console.error('Failed to add vehicle:', error);
  }
};

const handleAddReservation = async () => {
  try {
    await createReservation({
      ...reservationForm,
      vehicle: {
        ...reservationForm.vehicle,
        licensePlate: reservationForm.vehicle.licensePlate.toUpperCase()
      },
      reservationStart: new Date(reservationForm.reservationStart),
      reservationEnd: new Date(reservationForm.reservationEnd)
    });
    
    // Reset form
    Object.assign(reservationForm, {
      guestName: '',
      guestPhone: '',
      vehicle: {
        licensePlate: '',
        make: '',
        model: '',
        color: ''
      },
      reservationStart: '',
      reservationEnd: '',
      notes: ''
    });
    
    showAddReservation.value = false;
  } catch (error) {
    console.error('Failed to create reservation:', error);
  }
};

// Load data on mount
onMounted(async () => {
  await Promise.all([
    fetchVehicles(),
    fetchReservations()
  ]);
});
</script>