# Turtle Spot Taiwan

Single-page responsive Turtle Spot Taiwan site built with Next.js App Router,
TypeScript, Tailwind CSS, and Apollo Client.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
```

## GraphQL

The page reads activity data from:

```text
https://f2e-test.simpleinfo.tw/graphql
```

If the API is unavailable, the page falls back to the design-spec witness story
content so the layout remains stable.

## GitHub Pages

The repository deploys static output from `out/` through GitHub Actions. In the
repository settings, set Pages source to **GitHub Actions**.
