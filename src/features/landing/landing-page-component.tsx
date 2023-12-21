import Image from 'next/image';
import Link from 'next/link';

import { useServerTranslation } from '../localization/server';

type Props = {
  params: {
    lng: string;
  };
};

export async function LandingPageComponent({ params: { lng } }: Props) {
  const { t } = await useServerTranslation('landing', lng);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />

      <h1 className="mb-3 text-2xl font-semibold">{t('title')}</h1>

      <span>lng: {lng}</span>
      <Link href="https://earlynode.com" target="_blank">
        EarlyNode
      </Link>
    </main>
  );
}
