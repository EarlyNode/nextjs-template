'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { t } from '@/app/[lng]/dictionaries';
import { magicAdmin } from '@/features/user-authentication/magic';

type Values = {
  [k: string]: FormDataEntryValue;
};

const USER_SESSION_KEY = 'userId';

async function validateEmail(email: string | FormDataEntryValue) {
  const emailSchema = z
    .string({
      required_error: await t('user-authentication:email-required'),
      invalid_type_error: await t('user-authentication:email-must-be-string'),
    })
    .email({
      message: await t('user-authentication:email-invalid'),
    });

  return emailSchema.safeParse(email);
}

export async function handleLoginIntent(values: Values) {
  const { email } = values;
  const validationResult = await validateEmail(email);

  if (!validationResult.success) {
    return { emailError: validationResult.error.issues[0].message };
  }

  return { email: validationResult.data };
}

export async function handleMagicIntent(values: Values) {
  const { didToken } = values;

  if (typeof didToken !== 'string') {
    return {
      formError: await t('user-authentication:did-token-malformed-error'),
    };
  }

  const { issuer: userId } =
    await magicAdmin.users.getMetadataByToken(didToken);

  if (typeof userId !== 'string') {
    return {
      formError: await t('user-authentication:missing-issuer-metadata'),
    };
  }

  cookies().set(USER_SESSION_KEY, userId, {
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  redirect('/');
}

export async function handleMagicErrorIntent(values: Values) {
  const { formError } = values;

  if (typeof formError !== 'string') {
    return { formError: 'Invalid Magic error.' };
  }

  return { formError };
}

export async function getUserId() {
  return cookies().get(USER_SESSION_KEY)?.value;
}

export const isValidUserSession = async () => {
  const userId = await getUserId();
  if (!userId) {
    return redirect('/login');
  }

  return userId;
};

export const logout = async (userId: string) => {
  'use server';

  await magicAdmin.users.logoutByIssuer(userId);
  cookies().delete(USER_SESSION_KEY);
  redirect('/login');
};
