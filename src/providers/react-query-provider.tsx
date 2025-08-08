'use client';

import * as React from 'react';

import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

import { getBrandingQueryOptions } from '@/features/branding/hooks/queries/getBrand.query-option';
import { getAllProductsQueryOptions } from '@/features/products/hooks/queries/getAllProducts.query-option';
import { getAllStoresQueryOptions } from '@/features/stores/hooks/queries/getAllStores.query-option';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function Providers(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(getBrandingQueryOptions);
    void queryClient.prefetchQuery(getAllProductsQueryOptions);
    void queryClient.prefetchQuery(getAllStoresQueryOptions);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
