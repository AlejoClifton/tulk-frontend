import { useMutation, useQueryClient, QueryKey, MutationFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

interface UseBaseMutationOptions<TData, TVariables> {
    mutationFn: MutationFunction<TData, TVariables>;
    queryKey: QueryKey;
    successMessage: string;
    errorMessage: string;
    onSuccess?: () => void;
}

export function useBaseMutation<TData, TVariables>({
    mutationFn,
    queryKey,
    successMessage,
    errorMessage,
    onSuccess,
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
            onSuccess?.();
        },
        onError: handleMutationError,
    });

    return mutation;
}
