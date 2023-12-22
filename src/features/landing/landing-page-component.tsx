import Image from 'next/image';
import Link from 'next/link';

import { getDictionary, Locale } from '@/app/[lng]/dictionaries';

type Props = {
  params: {
    lng: Locale;
  };
};

export async function LandingPageComponent({ params: { lng } }: Props) {
  const { title } = await getDictionary(lng, 'landing');

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
      <h1 className="mb-3 text-2xl font-semibold">{title}</h1>
      <Link href="https://earlynode.com" target="_blank">
        EarlyNode
      </Link>
    </main>
  );
}
