# nine:am

A production-ready Astro boilerplate with GSAP animations and Barba.js page transitions.

## Features

- **Astro 5** - Static site generation with optional SSR
- **GSAP** - Professional-grade animations
- **Barba.js** - SPA-like page transitions
- **Custom Elements** - Component architecture with lifecycle hooks
- **SCSS** - Design tokens, mixins, and CSS layers
- **Netlify** - Deploy-ready adapter

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
nine-am/
├── src/
│   ├── components/          # Astro layout components (meta, analytics)
│   ├── css/                 # SCSS design system
│   │   ├── base/            # Base styles, typography, grid
│   │   ├── helpers/         # Utility classes
│   │   ├── mixins/          # SCSS mixins
│   │   ├── reset/           # CSS reset
│   │   ├── tokens/          # Design tokens (colors, spacing)
│   │   └── main.scss        # Entry point
│   ├── js/
│   │   ├── core/            # App singleton, base classes
│   │   ├── helpers/         # Utilities and animation presets
│   │   ├── pages/           # Page-specific JS classes
│   │   ├── plugins/         # Router (Barba)
│   │   └── main.js          # JS entry point
│   ├── layouts/             # Astro layouts
│   ├── pages/               # Astro pages (routes)
│   └── views/
│       ├── components/      # Interactive components (c-Name/)
│       └── sections/        # Page sections (s-Name/)
├── connectors/              # Optional data connectors
│   └── sanity/              # Sanity CMS integration
├── public/                  # Static assets
└── CLAUDE.md                # Claude Code scaffolding instructions
```

## Architecture

### Custom Element Components

Components use a custom element architecture for interactivity:

```javascript
// src/views/components/c-Button/index.js
import { Component } from '@js/core/component'

export const tagName = 'c-button'

export default class CButton extends Component {
  onConnected() {
    this._autobind('onClick')
    this.refs.link?.addEventListener('click', this.onClick)
  }

  onClick(e) {
    // Handle click
  }
}
```

### Lifecycle Hooks

- `onInit()` - Constructor phase
- `onConnected()` - Added to DOM
- `onDisconnected()` - Removed from DOM
- `onResize()` - Window resize
- `onTick()` - Animation frame
- `onEnter()` / `onLeave()` - Intersection observer

### Page Transitions

Barba.js handles page transitions with the router. Always use `Anims` presets for consistent animations:

```javascript
// src/js/pages/homepage.js
import { Anims } from '@js/helpers/animations'

export default class Homepage extends Page {
  async hide(data) {
    return GSAP.to(data.current.container, Anims.pageTransitions.hide)
  }

  async show(data) {
    return GSAP.from(data.next.container, Anims.pageTransitions.show)
  }
}
```

## Styling

### Design Tokens

Edit `src/css/tokens/_index.scss`:

```scss
:root {
  --primary: #1e4634;
  --secondary: #6bd488;
  --accent: #ed5b2e;
  // ...
}
```

### Responsive Design

```scss
@use '@css/mixins/media' as *;

.element {
  padding: 20px;

  @include media('>medium') {
    padding: 40px;
  }
}
```

Breakpoints: `xsmall` (420px), `msmall` (600px), `small` (768px), `medium` (1025px), `large` (1440px), `xlarge` (1800px)

## Creating Components

See `CLAUDE.md` for detailed scaffolding instructions.

Quick reference:

```
src/views/components/c-{Name}/
├── index.astro    # <c-name class="c-Name">...</c-name>
├── index.js       # Custom element class
└── index.scss     # BEM styles
```

## Connectors

### Sanity CMS

Optional CMS integration in `connectors/sanity/`.

```bash
npm install @sanity/client @sanity/image-url
```

See `connectors/sanity/README.md` for setup.

## Deployment

### Netlify

The boilerplate includes the Netlify adapter. Deploy with:

```bash
npm run build
```

Environment variables:
- `SITE_URL` - Your site URL
- `PREVIEW` - Set to 'true' for SSR/preview mode

## License

MIT
