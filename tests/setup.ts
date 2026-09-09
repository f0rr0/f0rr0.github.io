import { AsyncLocalStorage } from "node:async_hooks";

// Next installs this global in its server runtime; Bun uses the same native implementation.
Object.assign(globalThis, { AsyncLocalStorage });
