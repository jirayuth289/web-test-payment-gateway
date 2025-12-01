/**
 * Car status types
 */
export type CarStatus = 'available' | 'booked' | 'maintenance' | 'unavailable';

/**
 * Car interface
 */
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  status: CarStatus;
  mileage: number;
  pricePerDay: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Car form data (for create/update)
 */
export interface CarFormData {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  status: CarStatus;
  mileage: number;
  pricePerDay: number;
  description?: string;
}

/**
 * Car filter options
 */
export interface CarFilters {
  status?: CarStatus;
  make?: string;
  search?: string;
}
