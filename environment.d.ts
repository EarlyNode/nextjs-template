export type EnvironmentVariables = {
  NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: string;
};
declare global {
  var ENV: EnvironmentVariables;

  interface Window {
    runMagicInTestMode?: boolean;
  }
}
