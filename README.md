# NextJS Template 📄

## What is this made out of? 🤔

- Authentication with [Magic](https://magic.link/) which enables you to both
  build Web2 and Web3 apps
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to
  production and staging environments
- Styling with [Tailwind](https://tailwindcss.com/).
  - Includes [dark mode](https://tailwindcss.com/docs/dark-mode).
  - The routes in this app have been build using the
    [components from shadcn/ui](https://ui.shadcn.com/)
- End-to-end testing with [Playwright](https://playwright.dev)
- Unit testing with [Vitest](https://vitest.dev) and
  [Testing Library](https://testing-library.com)
- [PostgeSQL](https://www.postgresql.org) database with
  [Prisma](https://www.prisma.io/) as the ORM
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- Commit hooks with [Husky](https://github.com/typicode/husky) and
  [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) with
  [Commitizen](https://github.com/commitizen/cz-cli)

### Versioning

This app pinned all version of its dependencies in order to ensure that it
always works. You can use

```
npx npm-check-updates -u
```

to check for updates and install the latest versions.

## Development 🛠

### Getting Started

- Make sure you're using Node.js 16.0.0 or higher. You can run:

  ```sh
  node -v
  ```

  to check which version you're on.

- Install dependencies:

  ```sh
  npm i
  ```

- Make sure your system can run the Husky hooks (Mac & Linux):

  ```sh
  chmod a+x .husky/pre-commit
  chmod a+x .husky/commit-msg
  ```

- Create a `.env` file and add these environment variables (see `.env.example`,
  too):

  - `MAGIC_PUBLISHABLE_KEY` and `MAGIC_SECRET_KEY` - You'll need to grab a
    public key and a secret key for your project from your
    [Magic dashboard](https://magic.link).
  - `SESSION_SECRET` - The session secret can be any string that is at least 32
    characters long.
  - `DATABASE_URL` - The url under which the SQLite database will operate. You
    may use the value from `.env.example` for this.

- Set up the database:

  ```sh
  npm run prisma:setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

  ```sh
  npm run prisma:reset-dev
  ```

  , which wipes the database, seeds the database with lots of data and starts up
  the dev server again.

This starts your app in development mode, rebuilding assets on file changes.

### Prisma helper scripts

- `"prisma:apply-changes"` - Applies changes to the database schema to the
  database.
- `"prisma:seed"` - Seeds the database with a user profile.
- `"prisma:setup"` - Sets up the database.
- `"prisma:wipe"` - Wipes the database (irrevocably delete all data, but keep
  the schema).
- `"prisma:reset-dev"` - Wipes the database, seeds it and starts the dev server.
  This is a utility script that you can use in development to get clean starts.

## GitHub Actions

We use GitHub Actions for pull request checks. Any pull request triggers checks
such as linting, type checks, unit tests and E2E tests.

Check out the
[Remix team's official stacks](https://remix.run/docs/en/v1/pages/stacks) to
learn how to use GitHub Actions for continuous integration and deployment.

## Testing 🧪

### Playwright 🎭

> **Note:** make sure you've run `npm run dev` at least one time before you run
> the E2E tests!

We use Playwright for our End-to-End tests in this project. You'll find those in
the `playwright/` directory. As you make changes to your app, add to an existing
file or create a new file in the `playwright/e2e` directory to test your
changes.

[Playwright natively features testing library selectors](https://playwright.dev/docs/release-notes#locators)
for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e` which will start the
dev server for the app as well as the Playwright client.

#### VSCode Extension

If you're using VSCode, you can install the
[Playwright extension](https://github.com/microsoft/playwright-vscode) for a
better developer experience.

#### Utilities

We have a utility for testing authenticated features without having to go
through the login flow:

```ts
test('something that requires an authenticated user', async ({ page }) => {
  await loginByCookie({ page });
  // ... your tests ...
});
```

Check out the `playwright/utils.ts` file for other utility functions.

#### Miscellaneous

To mark a test as todo in Playwright,
[you have to use `.fixme()`](https://github.com/microsoft/playwright/issues/10918).

```ts
test('something that should be done later', ({}, testInfo) => {
  testInfo.fixme();
});

test.fixme('something that should be done later', async ({ page }) => {
  // ...
});

test('something that should be done later', ({ page }) => {
  test.fixme();
  // ...
});
```

The version using `testInfo.fixme()` is the "preferred" way and can be picked up
by the VSCode extension.

### Vitest ⚡️

For lower level tests of utilities and individual components, we use `vitest`.
We have DOM-specific assertion helpers via
[`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

#### `assert()`

There are
[5 questions every unit test must answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)
and [Eric Elliott](https://mobile.twitter.com/_ericelliott) created a testing
framework called [RITEway](https://github.com/paralleldrive/riteway) that forces
you to write **R**eadable, **I**solated, and **E**xplicit tests. The framework
only exposes a single `assert` test function, which performs a deep equality
check.

ReleaseLog features this `assert` testing utility function, but it works with
Vitest.

```ts
import { describe } from 'vitest';

import { assert } from '~/test/assert';

const sum = (a: number, b: number) => a + b;

describe('sum()', () => {
  assert({
    given: 'two numbers',
    should: 'returns the sum of the two numbers',
    actual: sum(21, 21),
    expected: 42,
  });
});
```

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your
editor to get a really great in-editor experience with type checking and
auto-complete. To run type checking across the whole project, run
`npm run type-check`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project.
It's recommended to install an editor plugin (like the
[VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
to get auto-formatting on save. There's also a `npm run format` script you can
run to format all files in the project.
