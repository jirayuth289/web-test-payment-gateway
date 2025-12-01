import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { carService } from '../services';
import type { Car, CarFormData, CarFilters } from '../types';
import { useAppDispatch } from '@/core/store';
import { setCars, addCar, updateCar, deleteCar, setLoading, setError } from '../store';
import { getErrorMessage } from '@/core/api';

/**
 * Query keys for car queries
 */
export const carKeys = {
  all: ['cars'] as const,
  lists: () => [...carKeys.all, 'list'] as const,
  list: (filters?: CarFilters) => [...carKeys.lists(), filters] as const,
  details: () => [...carKeys.all, 'detail'] as const,
  detail: (id: string) => [...carKeys.details(), id] as const,
};

/**
 * Hook to fetch all cars with optional filters
 */
export const useCars = (filters?: CarFilters) => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: carKeys.list(filters),
    queryFn: () => carService.getCars(filters),
  });

  // Handle success and error using useEffect (React Query v5 approach)
  useEffect(() => {
    if (query.data) {
      dispatch(setCars(query.data));
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      dispatch(setError(getErrorMessage(query.error)));
    }
  }, [query.error, dispatch]);

  return query;
};

/**
 * Hook to fetch a single car by ID
 */
export const useCar = (id: string, enabled = true) => {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: () => carService.getCarById(id),
    enabled: enabled && !!id,
  });
};

/**
 * Hook to create a new car
 */
export const useCreateCar = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (carData: CarFormData) => carService.createCar(carData),
    onSuccess: (newCar: Car) => {
      // Invalidate and refetch cars list
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      // Update Redux store
      dispatch(addCar(newCar));
    },
    onError: (error: unknown) => {
      dispatch(setError(getErrorMessage(error)));
    },
  });
};

/**
 * Hook to update an existing car
 */
export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CarFormData> }) =>
      carService.updateCar(id, data),
    onSuccess: (updatedCar: Car) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: carKeys.detail(updatedCar.id) });
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      // Update Redux store
      dispatch(updateCar(updatedCar));
    },
    onError: (error: unknown) => {
      dispatch(setError(getErrorMessage(error)));
    },
  });
};

/**
 * Hook to delete a car
 */
export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: string) => carService.deleteCar(id),
    onSuccess: (_, deletedId) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: carKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      // Update Redux store
      dispatch(deleteCar(deletedId));
    },
    onError: (error: unknown) => {
      dispatch(setError(getErrorMessage(error)));
    },
  });
};

