import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car, CarFilters } from '../types';

interface CarState {
  cars: Car[];
  selectedCar: Car | null;
  filters: CarFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  selectedCar: null,
  filters: {},
  isLoading: false,
  error: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    updateCar: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = action.payload;
      }
      if (state.selectedCar?.id === action.payload.id) {
        state.selectedCar = action.payload;
      }
    },
    deleteCar: (state, action: PayloadAction<string>) => {
      state.cars = state.cars.filter(car => car.id !== action.payload);
      if (state.selectedCar?.id === action.payload) {
        state.selectedCar = null;
      }
    },
    setSelectedCar: (state, action: PayloadAction<Car | null>) => {
      state.selectedCar = action.payload;
    },
    setFilters: (state, action: PayloadAction<CarFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: state => {
      state.filters = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetCarState: () => initialState,
  },
});

export const {
  setCars,
  addCar,
  updateCar,
  deleteCar,
  setSelectedCar,
  setFilters,
  clearFilters,
  setLoading,
  setError,
  resetCarState,
} = carSlice.actions;

export default carSlice.reducer;

