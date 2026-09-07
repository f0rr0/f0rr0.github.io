import { env as appEnv } from "../src/env.ts";

export const env = appEnv as {
  -readonly [K in keyof typeof appEnv]: (typeof appEnv)[K];
};

export const mockFetch = (
  implementation: (
    ...args: Parameters<typeof fetch>
  ) => ReturnType<typeof fetch>
): typeof fetch =>
  Object.assign(implementation, { preconnect: fetch.preconnect });
