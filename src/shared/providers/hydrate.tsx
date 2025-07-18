import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/get-query-client';

type HydrateProps = {
    queryOptions: object | object[];
    children: React.ReactNode;
};

export default async function Hydrate({ queryOptions, children }: HydrateProps) {
    const queryClient = getQueryClient();

    const optionsArray = Array.isArray(queryOptions) ? queryOptions : [queryOptions];

    await Promise.all(
        optionsArray.map((option) => queryClient.prefetchQuery(option))
    );

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
