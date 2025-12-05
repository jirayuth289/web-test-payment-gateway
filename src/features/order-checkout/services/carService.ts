import { apiClient } from '@/core/api';
import { mockCarApi } from '@/core/api/mockAdapter';
import type { Car, CarFormData, CarFilters } from '../types';

/**
 * Car API Service
 * Handles all car-related API calls
 * 
 * Note: Currently using mock API for development
 * Set VITE_USE_MOCK_API=false to use real API
 */

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
const CAR_ENDPOINT = '/cars';

/**
 * Get all cars with optional filters
 */
export const getCars = async (filters?: CarFilters): Promise<Car[]> => {
  if (USE_MOCK_API) {
    return mockCarApi.getCars(filters);
  }
  const response = await apiClient.get<Car[]>(CAR_ENDPOINT, {
    params: filters,
  });
  return response.data;
};

/**
 * Get a single car by ID
 */
export const getCarById = async (id: string): Promise<Car> => {
  if (USE_MOCK_API) {
    return mockCarApi.getCarById(id);
  }
  const response = await apiClient.get<Car>(`${CAR_ENDPOINT}/${id}`);
  return response.data;
};

/**
 * Create a new car
 */
export const createCar = async (carData: CarFormData): Promise<Car> => {
  if (USE_MOCK_API) {
    return mockCarApi.createCar(carData);
  }
  const response = await apiClient.post<Car>(CAR_ENDPOINT, carData);
  return response.data;
};

/**
 * Update an existing car
 */
export const updateCar = async (
  id: string,
  carData: Partial<CarFormData>
): Promise<Car> => {
  if (USE_MOCK_API) {
    return mockCarApi.updateCar(id, carData);
  }
  const response = await apiClient.put<Car>(`${CAR_ENDPOINT}/${id}`, carData);
  return response.data;
};

/**
 * Delete a car
 */
export const deleteCar = async (id: string): Promise<void> => {
  if (USE_MOCK_API) {
    return mockCarApi.deleteCar(id);
  }
  await apiClient.delete(`${CAR_ENDPOINT}/${id}`);
};

/**
 * Car service object
 */
export const carService = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};

