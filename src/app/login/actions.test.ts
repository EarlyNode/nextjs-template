import { describe, expect, it, vi } from 'vitest';

import { loginAction } from './actions';

describe('login actions', () => {
  vi.mock('server-only', () => {
    return {};
  });

  it('given no intent should return an error message', async () => {
    const formData = new FormData();

    const response = await loginAction({}, formData);

    expect(response).toEqual({ formError: 'Invalid intent' });
  });
});
