import { httpBatchLink } from '@trpc/client/links/httpBatchLink';

import { appRouter } from "@/server";

export const serverClient = appRouter.createCaller({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/api/trpc',
        }),
    ],
});