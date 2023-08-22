import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from "@/server";

const handler = (req: Request) => {
  return fetchRequestHandler({
    router: appRouter,
    req,
    endpoint: '/api/trpc',
    createContext: () => {
      return {};
    }
  });
}

export { handler as GET, handler as POST };