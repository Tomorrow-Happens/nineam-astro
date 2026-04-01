# Sanity CMS Connector

This connector provides Sanity CMS integration for the Nine AM boilerplate.

## Installation

1. Install the required dependencies:

```bash
npm install @sanity/client @sanity/image-url
```

2. Add environment variables to your `.env` file:

```env
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_VIEWER_API_TOKEN=your-token  # Optional: for preview mode
PREVIEW=false                        # Set to 'true' for draft content
```

## Setup

### 1. Import connector
Import directly from the connector (update tsconfig paths if needed):

```json
{
  "compilerOptions": {
    "paths": {
      "@connectors/*": ["./connectors/*"]
    }
  }
}
```

### 2. Use in your Astro pages

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
