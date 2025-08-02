import { useMutation, useQueryClient, QueryKey, MutationFunction } from '@tanstack/react-query';
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
        toast.error(errorMessage);
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
