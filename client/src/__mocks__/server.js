import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

// MSW server instance shared across all Vitest tests
export const server = setupServer(...handlers);
