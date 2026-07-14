import { defineConfig } from 'astro/config';

// ---------------------------------------------------------------------------
// GitHub Pages configuration
// ---------------------------------------------------------------------------
// `site` must be your GitHub Pages URL. `base` must be your repo name, UNLESS
// your repo is named "<your-username>.github.io", in which case delete the
// `base` line entirely (it should be "/").
//
// Example A — repo is named "my-username.github.io":
//   site: 'https://my-username.github.io',
//   (no base line)
//
// Example B — repo is named "portfolio" (a normal project repo):
//   site: 'https://my-username.github.io',
//   base: '/portfolio',
//
// See README.md → "Deploying to GitHub Pages" for the full walkthrough.
// ---------------------------------------------------------------------------
export default defineConfig({
site: 'https://amoghmoholkar.github.io',
base: '/amogh_website',
  trailingSlash: 'always',
});
