# Sanity CMS Connector

This connector provides Sanity CMS integration for the Nine AM boilerplate.

### Use in your Astro pages

```astro
---
import { getPages, getSiteOptions } from '@connectors/sanity/lib/sanity.js'
import CImage from '@components/c-Image/index.astro'

const pages = await getPages()
const siteOptions = await getSiteOptions()
---

<CImage src={page.featuredImage} alt="Featured" />
```

## Customizing Queries

Edit `lib/sanity.js` to add your own GROQ queries based on your Sanity schema:

## Preview Mode

To enable preview mode (draft content):

1. Set `PREVIEW=true` in your environment
2. Ensure `SANITY_VIEWER_API_TOKEN` is set with a token that has Viewer permissions

For SSR preview, update `astro.config.mjs`:

```javascript
export default defineConfig({
  output: process.env.PREVIEW === 'true' ? 'server' : 'static',
  // ...
})
```
