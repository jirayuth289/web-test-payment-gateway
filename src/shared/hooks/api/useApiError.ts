import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import { getErrorMessage, type ApiError } from '@/core/api';
import { useCallback, useEffect } from 'react';

/**
 * Hook to handle API errors consistently
 */
export const useApiError = () => {
  const handleError = useCallback((error: unknown): ApiError => {
    return {
      message: getErrorMessage(error),
      status: (error as { response?: { status?: number } })?.response?.status,
      data: (error as { response?: { data?: unknown } })?.response?.data,
    };
  }, []);

  return { handleError };
};

/**
 * Hook wrapper for queries with error handling
 * Note: React Query v5 removed onError/onSuccess from options
 * Use useEffect in component to handle errors instead
 */
export const useQueryWithError = <TData, TError = unknown>(
  options: UseQueryOptions<TData, TError>
) => {
  const { handleError } = useApiError();
  const query = useQuery(options);

  // Handle errors using useEffect (React Query v5 approach)
  useEffect(() => {
    if (query.error) {
      const apiError = handleError(query.error);
      console.error('Query error:', apiError);
    }
  }, [query.error, handleError]);

  return query;
};

/**
 * Hook wrapper for mutations with error handling
 * Note: React Query v5 still supports onError in mutations
 */
export const useMutationWithError = <TData, TVariables, TContext = unknown, TError = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const { handleError } = useApiError();

  return useMutation({
    ...options,
    onError: (error: TError, variables: TVariables, context: TContext | undefined) => {
      const apiError = handleError(error);
      console.error('Mutation error:', apiError);
      // Call original onError if provided
      if (options.onError) {
        options.onError(error, variables, context, undefined as any);
      }
    },
  });
};

