'use server';

import {
  handleLoginIntent,
  handleMagicErrorIntent,
  handleMagicIntent,
} from '@/features/user-authentication/user-authentication-server-helpers';

import { t } from '../[lng]/dictionaries';

type ActionData = {
  email?: string;
  emailError?: string;
  formError?: string;
};

const Intents = {
  MAGIC: 'magic',
  MAGIC_ERROR: 'magicError',
  LOGIN: 'login',
} as const;

export async function loginAction(
  _previousState: ActionData,
  formData: FormData,
): Promise<ActionData> {
  console.log('');
  try {
    const { _intent, ...values } = Object.fromEntries(formData);
    console.log('intent', _intent);

    switch (_intent) {
      case Intents.LOGIN: {
        return await handleLoginIntent(values);
      }
      case Intents.MAGIC: {
        return await handleMagicIntent(values);
      }
      case Intents.MAGIC_ERROR: {
        return await handleMagicErrorIntent(values);
      }
      default: {
        return {
          formError: await t('user-authentication:invalid-intent'),
        };
      }
    }
  } catch {
    // log error
    return {
      formError: await t('user-authentication:server-error'),
    };
  }
}
