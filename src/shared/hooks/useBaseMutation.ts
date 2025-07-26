
import { useMutation, useQueryClient, QueryKey, MutationFunction } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { AxiosError } from 'axios';

interface UseBaseMutationOptions<TData, TVariables> {
    mutationFn: MutationFunction<TData, TVariables>;
    queryKey: QueryKey;
    successMessage: string;
    errorMessage: string;
}

export function useBaseMutation<TData, TVariables>({
    mutationFn,
    queryKey,
    successMessage,
    errorMessage,
}: UseBaseMutationOptions<TData, TVariables>) {
    const queryClient = useQueryClient();

    const handleMutationError = (error: unknown) => {
        console.error(errorMessage, error);

        let finalErrorMessage = errorMessage;

        if (error instanceof AxiosError && error.response?.status === 401) {
            finalErrorMessage = 'Error de autenticación. Redirigiendo al login...';
            signIn('keycloak');
        }

        toast.error(finalErrorMessage);
        queryClient.invalidateQueries({ queryKey });
    };

    const mutation = useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success(successMessage);
        },
        onError: handleMutationError,
    });

    return mutation;
} 