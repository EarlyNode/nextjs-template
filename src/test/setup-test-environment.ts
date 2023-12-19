import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom/matchers';

import { afterEach, vi } from 'vitest';

// See https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment.
// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  vi.restoreAllMocks();
});
