import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '@/test/tests-utils';

import { LandingPageComponent } from './landing-page-component';

describe('Landing page component', () => {
  it('should render the landing page component', () => {
    render(<LandingPageComponent />);

    expect(
      screen.getByRole('heading', { level: 1, name: /next js starter/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /vercel logo/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /earlynode/i }),
    ).toBeInTheDocument();
  });
});
