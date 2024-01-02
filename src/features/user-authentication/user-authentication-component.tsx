import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import type { RefObject } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils';

const ErrorMessage = ({
  errorMessage,
  id,
}: {
  errorMessage: string;
  id: string;
}) => (
  <div className="rounded-md bg-red-50 p-2 ">
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400 " />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700 " id={id} role="alert">
          {errorMessage}
        </p>
      </div>
    </div>
  </div>
);

export const loginIntent = 'login';

export type UserAuthenticationComponentProps = {
  email?: string;
  emailError?: string;
  formError?: string;
  isLoginPage?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  state: 'idle' | 'submitting' | 'error';
  action: (payload: FormData) => void;
};

export async function UserAuthenticationComponent({
  email,
  emailError,
  formError,
  inputRef,
  action,
  state,
}: UserAuthenticationComponentProps) {
  const isLoading = state === 'submitting';

  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <div className="grid gap-6">
              <form
                aria-describedby={formError && 'form-error'}
                action={action}
              >
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      ref={inputRef}
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      disabled={isLoading}
                      aria-describedby={emailError && 'email-error'}
                      aria-invalid={Boolean(emailError)}
                      autoComplete="email"
                      defaultValue={email}
                      name="email"
                    />
                  </div>

                  {(emailError || formError) && (
                    <ErrorMessage
                      errorMessage={(emailError || formError) ?? ''}
                      id="error"
                    />
                  )}
                  <Button
                    name="_intent"
                    type="submit"
                    value={loginIntent}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In with Email
                  </Button>
                </div>
              </form>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
