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

### 1. Copy files to your project

Copy the connector files to your `src/lib` directory:

```bash
cp connectors/sanity/lib/*.js src/lib/
```

Or import directly from the connector (update tsconfig paths if needed):

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
import CImage from '@connectors/sanity/components/c-Image/index.astro'

const pages = await getPages()
const siteOptions = await getSiteOptions()
---

<CImage image={page.featuredImage} alt="Featured" />
```

## Components

### c-Image

Responsive Sanity image component with automatic srcset generation.

Props:
- `image` (required) - Sanity image object with asset._ref
- `alt` - Alt text
- `sizes` - Responsive sizes attribute
- `widths` - Array of widths to generate (default: [320, 640, 960, 1200, 1800])
- `loading` - 'lazy' | 'eager' (default: 'lazy')
- `quality` - Image quality 1-100 (default: 70)
- `intrinsic` - Use intrinsic aspect ratio wrapper (default: false)

```astro
<CImage
  image={data.image}
  alt="Description"
  widths={[400, 800, 1200]}
  loading="eager"
  quality={80}
  intrinsic
/>
```

## Customizing Queries

Edit `lib/sanity.js` to add your own GROQ queries based on your Sanity schema:

```javascript
export async function getBlogPosts() {
  return await client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      featuredImage {
        asset->{
          _id,
          url,
          metadata { dimensions }
        }
      },
      publishedAt
    }`
  )
}
```

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
