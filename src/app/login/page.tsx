'use client';

import type { SDKBase } from '@magic-sdk/provider';
import { Magic } from 'magic-sdk';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { UserAuthenticationComponent } from '@/features/user-authentication/user-authentication-component';
import { usePromise } from '@/hooks/use-promise';

import { loginAction } from './actions';

const initialState = {
  errorMessage: '',
  formError: '',
  email: '',
  emailError: '',
};

export default function Page() {
  const [data, formAction] = useFormState(loginAction, initialState);
  const { pending } = useFormStatus();

  const state = pending ? 'submitting' : data?.formError ? 'error' : 'idle';

  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === 'error') {
      inputRef.current?.focus();
    }

    if (state === 'idle' && mounted.current) {
      inputRef.current?.select();
    }

    mounted.current = true;
  }, [state]);

  const [magicReady, setMagicReady] = usePromise<{
    magic: SDKBase;
  }>();

  useEffect(() => {
    async function downloadMagicStaticAssets() {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
        /**
         * @see https://magic.link/docs/introduction/test-mode
         */
        testMode: window.runMagicInTestMode,
      });
      await magic.preload();
      setMagicReady({ magic });
    }

    downloadMagicStaticAssets().catch(error => {
      console.log('error', error);
      const formData = new FormData();

      formData.set('_intent', 'magicError');
      formData.set('error', 'user-authentication:failed-to-load-magic');

      formAction(formData);
    });
  }, [formAction, setMagicReady]);

  useEffect(() => {
    if (data.email) {
      const loginWithMagic = async () => {
        try {
          const { magic } = await magicReady;
          const didToken = await magic.auth.loginWithMagicLink({
            email: data.email!,
          });

          if (didToken) {
            const formData = new FormData();
            formData.set('didToken', didToken);
            formData.set('_intent', 'magic');

            formAction(formData);
          } else {
            const formData = new FormData();

            formData.set('_intent', 'magicError');
            formData.set('error', 'user-authentication:did-token-missing');

            formAction(formData);
          }
        } catch (error) {
          console.log('error', error);

          const formData = new FormData();

          formData.set('_intent', 'magicError');
          formData.set('error', 'user-authentication:logic-failed');

          formAction(formData);
        }
      };

      loginWithMagic();
    }
  }, [data?.email, formAction, magicReady]);

  return (
    <UserAuthenticationComponent
      action={formAction}
      email={data?.email}
      emailError={data.emailError}
      formError={data.formError}
      state={state}
    />
  );
}
