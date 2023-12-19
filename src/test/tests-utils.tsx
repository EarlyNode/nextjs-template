import {
  queries,
  render as rtlRender,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { vi } from 'vitest';

import { Providers } from './providers';

type UI = JSX.Element;

export type Options = {
  router?: Partial<AppRouterInstance>;
} & RenderOptions;

const mockedRouter: AppRouterInstance = {
  back: vi.fn(),
  forward: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

const customRender = (
  ui: UI,
  { router, ...options }: Options = {},
): RenderResult => {
  const Wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <Providers router={{ ...mockedRouter, ...(router ? { ...router } : {}) }}>
        {children}
      </Providers>
    );
  };

  const utils = rtlRender(ui, {
    wrapper: Wrapper,
    queries,
    ...options,
  });

  return {
    ...utils,
  };
};

export { customRender as render };
