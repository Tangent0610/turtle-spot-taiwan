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

The repository is prepared to use `main` as the publishing branch. This Next.js
page currently uses dynamic server rendering for the GraphQL request; before
turning on GitHub Pages static hosting, convert the activity request to a
client-side fetch or static export flow and then enable Pages from the GitHub
repository settings.
