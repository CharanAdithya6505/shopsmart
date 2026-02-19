import "@testing-library/jest-dom";
import { server } from "./__mocks__/server.js";

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers between tests so one test doesn't affect another
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());
