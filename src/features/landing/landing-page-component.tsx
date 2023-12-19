import Image from 'next/image';
import Link from 'next/link';

export function LandingPageComponent() {
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

      <h1 className="mb-3 text-2xl font-semibold">Next JS Starter</h1>

      <Link href="https://earlynode.com" target="_blank">
        EarlyNode
      </Link>
    </main>
  );
}
