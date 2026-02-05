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

### View Hierarchy

Pages are composed of three types of views:

| Prefix | Type | Purpose | Example |
|--------|------|---------|---------|
| `s-` | **Section** | Full parts of the site (hero, footer, feature block) | `s-Hero`, `s-Footer` |
| `c-` | **Component** | Small reusable blocks | `c-Button`, `c-Image` |
| `e-` | **Element** | Things that don't fit above - headers, utility cards, or views without JS | `e-Header` |

---

### The App (`src/js/core/app.js`)

The App is the central conductor of the entire site. It's a singleton that orchestrates all interactive elements.

**What it manages:**

| Responsibility | Description |
|----------------|-------------|
| **Actors** | Tracks all active components, sections, and pages via `attach()` / `detach()` |
| **Page Management** | Mounts/unmounts page classes based on `data-s-page` attribute on body |
| **Tick Loop** | Runs a `requestAnimationFrame` loop, calling `onTick({ time, dt, frame })` on every actor |
| **Resize** | Listens for resize/orientation changes, calls `onResize({ width, height, dpr, breakpoint })` on all actors |
| **Event Bus** | Global pub/sub via `app.bus.emit()` / `app.bus.on()` |
| **Globals** | Stores shared state: `breakpoint`, `isTouch`, `env`, `settings` |

**How actors connect:**

```
App (singleton)
 ├── attach(actor) → adds to Set, calls actor.onConnected()
 ├── detach(actor) → calls actor.onDisconnected(), removes from Set
 │
 └── On every frame / resize:
      └── iterates all actors → calls onTick() / onResize()
```

Components extending `BaseElement` or `Component` automatically attach/detach themselves when added/removed from the DOM.

**Accessing the App:**

```javascript
// From within a component
this.app.bus.emit('menuOpen')
this.app.globals.breakpoint  // 'small', 'medium', 'large', etc.

// From anywhere
import { App } from '@js/core/app'
const app = App.get()
```

---

### Pages

Each page can have its own class in `src/js/pages/`. The page class is selected via `data-s-page="pagename"` on the body element (used by Barba for transitions).

```javascript
// src/js/pages/homepage.js
import Page from './page'
import GSAP from 'gsap'
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

Register pages in `src/js/pages/index.js`:

```javascript
import homepage from './homepage'

export const pages = {
  default: defaultPage,
  homepage: homepage,
}
```

---

### Router (Barba)

`src/js/plugins/router.js` integrates Barba.js for SPA-style navigation. It handles page transitions by calling the active page's `hide()` and `show()` methods.

---

### Interactive Views (Custom Elements)

Sections and components use Custom Elements when they need JavaScript interactivity. They extend `BaseElement` (full control) or `Component` (sensible defaults) and inherit lifecycle hooks and helper methods. They auto-register with the App when connected to the DOM.

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

---

### Lifecycle Hooks & Helpers

**Lifecycle hooks** (called by the App):

| Hook | When Called |
|------|-------------|
| `onInit()` | In constructor, before DOM ready |
| `onConnected()` | Element added to DOM |
| `onDisconnected()` | Element removed from DOM |
| `onTick({ time, dt, frame })` | Every animation frame |
| `onResize({ width, height, dpr, breakpoint })` | On viewport change |
| `onEnter(entry)` / `onLeave(entry)` | Intersection observer triggers |

**Helper methods** (available on Component):

| Helper | Description |
|--------|-------------|
| `this.refs` | Auto-collected `data-ref` elements |
| `this.settings` | Parsed `data-s-*` attributes |
| `this.app.bus` | Global event emitter |
| `this.show()` / `this.hide()` / `this.toggle()` | Visibility helpers |
| `this.$()` / `this.$$()` | Query selector shortcuts |
| `this._autobind()` | Bind methods for event handlers |
| `this.setState()` | State management with change tracking |

---

### Styles

- **Tokens** (`src/css/tokens/`) - Design variables (colors, spacing, fonts)
- **Type Ramp** (`src/css/tokens/_type.scss`) - Defines typography scales
- **ft() mixin** - Generates fluid typography from the type ramp: `@include ft(h1)`, `@include ft(body)`
- **Mixins** (`src/css/mixins/`) - Reusable patterns (media queries, spacing, grid)

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
