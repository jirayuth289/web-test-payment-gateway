/**
 * Mock API Adapter
 * This is a simple mock implementation for development/testing
 * In production, replace this with actual API calls
 */

import type { Car, CarFormData, CarFilters } from '@/features/car-management/types';

// Mock data storage (in-memory)
let mockCars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    color: 'White',
    licensePlate: 'ABC-1234',
    status: 'available',
    mileage: 5000,
    pricePerDay: 50,
    description: 'Reliable sedan with great fuel economy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    color: 'Black',
    licensePlate: 'XYZ-5678',
    status: 'booked',
    mileage: 12000,
    pricePerDay: 45,
    description: 'Compact car perfect for city driving',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    make: 'Ford',
    model: 'Mustang',
    year: 2024,
    color: 'Red',
    licensePlate: 'SPT-9012',
    status: 'maintenance',
    mileage: 2000,
    pricePerDay: 80,
    description: 'Sports car with powerful engine',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Simulate API delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API functions
 */
export const mockCarApi = {
  getCars: async (filters?: CarFilters): Promise<Car[]> => {
    await delay(500); // Simulate network delay
    
    let filteredCars = [...mockCars];
    
    if (filters) {
      if (filters.status) {
        filteredCars = filteredCars.filter(car => car.status === filters.status);
      }
      if (filters.make) {
        filteredCars = filteredCars.filter(car =>
          car.make.toLowerCase().includes(filters.make!.toLowerCase())
        );
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCars = filteredCars.filter(
          car =>
            car.make.toLowerCase().includes(searchLower) ||
            car.model.toLowerCase().includes(searchLower) ||
            car.licensePlate.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return filteredCars;
  },

  getCarById: async (id: string): Promise<Car> => {
    await delay(300);
    const car = mockCars.find(c => c.id === id);
    if (!car) {
      throw new Error('Car not found');
    }
    return car;
  },

  createCar: async (carData: CarFormData): Promise<Car> => {
    await delay(500);
    const newCar: Car = {
      id: String(mockCars.length + 1),
      ...carData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCars.push(newCar);
    return newCar;
  },

  updateCar: async (id: string, carData: Partial<CarFormData>): Promise<Car> => {
    await delay(500);
    const index = mockCars.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Car not found');
    }
    const updatedCar: Car = {
      ...mockCars[index],
      ...carData,
      updatedAt: new Date().toISOString(),
    };
    mockCars[index] = updatedCar;
    return updatedCar;
  },

  deleteCar: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockCars.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Car not found');
    }
    mockCars.splice(index, 1);
  },
};

