import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '@/test/tests-utils';

import { LandingPageComponent } from './landing-page-component';

describe('Landing page component', () => {
  it('should render the landing page component', async () => {
    render(await LandingPageComponent({ params: { lng: 'en' } }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /this is a starter template/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /vercel logo/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /earlynode/i }),
    ).toBeInTheDocument();
  });

  it('should render the correct text for a diffrent locale ("de")', async () => {
    render(await LandingPageComponent({ params: { lng: 'de' } }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /dies ist eine einstiegsvorlagee/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /vercel logo/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /earlynode/i }),
    ).toBeInTheDocument();
  });
});
