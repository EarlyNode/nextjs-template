import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { AppRouterContextProviderMock } from './app-router';

type Props = {
  children: JSX.Element;
  router: AppRouterInstance;
};

const Providers: React.FC<Props> = ({ children, router }) => (
  <AppRouterContextProviderMock router={router}>
    {children}
  </AppRouterContextProviderMock>
);

export { Providers };
