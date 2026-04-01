# Nine AM - Claude Code Instructions

## Project Overview

This is an Astro boilerplate with:
- Custom Element architecture for interactive components
- GSAP for animations
- Barba.js for SPA page transitions
- SCSS with design tokens and CSS layers

## Path Aliases

```
@views/*       → src/views/*
@components/*  → src/views/components/*
@sections/*    → src/views/sections/*
@assets/*      → src/assets/*
@css/*         → src/css/*
@layouts/*     → src/layouts/*
@pages/*       → src/pages/*
@js/*          → src/js/*
@connectors/*  → connectors/*
```

---

## Creating Components

### Component Structure (c-Name)

Location: `src/views/components/c-{Name}/`

```
c-{Name}/
├── index.astro    # Astro template
├── index.js       # Custom element class (optional)
└── index.scss     # Styles
```

### Template: index.astro

```astro
---
import './index.scss'

const { label = 'Default' } = Astro.props
---

<c-name class="c-Name">
	<div class="c-Name__inner" data-ref="inner">
		{label}
	</div>
	<slot />
</c-name>
```

### Template: index.js (Interactive Components)

**Simple component using Component base class:**

```javascript
import { Component } from '@js/core/component'

export const tagName = 'c-name'

export default class CName extends Component {
	// No constructor needed - uses sensible defaults

	onConnected() {
		// Setup code
	}

	onEnter() {
		this.show() // Adds is-visible class
	}
}
```

**Component with custom state:**

```javascript
import { Component } from '@js/core/component'

export const tagName = 'c-counter'

export default class CCounter extends Component {
	static config = {
		state: { count: 0 }
	}

	onConnected() {
		this._autobind('onClick')
		this.refs.button?.addEventListener('click', this.onClick)
	}

	onClick() {
		this.setState({ count: this.state.count + 1 })
		this.refs.count.textContent = this.state.count
	}
}
```

**Using BaseElement directly (full control):**

```javascript
import { BaseElement } from '@js/core/base-element'

export const tagName = 'c-name'

export default class CName extends BaseElement {
	constructor() {
		super({
			state: { isActive: false },
			classes: { isVisible: 'is-visible' },
			settings: { intersectionOnce: true },
			params: {},
		})
	}

	onConnected() {
		// Setup code
	}

	onEnter(entry) {
		this.element.classList.add(this.classes.isVisible)
	}
}
```

### Template: index.scss

```scss
@use '@css/mixins/spacing' as *;
@use '@css/mixins/media' as *;
@use '@css/mixins/transitions' as *;

.c-Name {
	@include transition-enter;

	&__inner {
		// BEM child element
	}

	&.is-visible {
		// Visible state styles
	}
}
```

---

## Creating Sections

### Section Structure (s-Name)

Location: `src/views/sections/s-{Name}/`

Same structure as components, but use `s-` prefix.

### Template: index.astro

```astro
---
import './index.scss'

const { title, description } = Astro.props
---

<s-name class="s-Name">
	<div class="s-Name__inner">
		<h2 class="s-Name__title" data-ref="title">{title}</h2>
		{description && <p class="s-Name__description">{description}</p>}
		<slot />
	</div>
</s-name>
```

### Template: index.scss (with grid)

```scss
@use '@css/mixins/spacing' as *;
@use '@css/mixins/media' as *;
@use '@css/mixins/v-spacing' as *;
@use '@css/mixins/grid' as *;

.s-Name {
	@include default-side-margin;
	@include v-spacing(padding-top, var(--sizing-1-5), var(--sizing-3-5));
	@include v-spacing(padding-bottom, var(--sizing-1-5), var(--sizing-3-5));

	&__inner {
		@include grid-base;
	}

	&__title {
		grid-column: 1 / -1;

		@include media('>medium') {
			grid-column: 1 / 7;
		}
	}
}
```

---

## Lifecycle Hooks Reference

Available hooks for components extending BaseElement/Component:

| Hook | When Called |
|------|-------------|
| `onInit()` | In constructor, before DOM ready |
| `onConnected()` | Element added to DOM |
| `onDisconnected()` | Element removed from DOM |
| `onResize({ width, height, dpr, breakpoint })` | Window resize |
| `onTick({ time, dt, frame })` | Every animation frame |
| `onEnter(entry)` | Element enters viewport |
| `onLeave(entry)` | Element leaves viewport |
| `onSettingsChanged(settings)` | data-s attribute changes |

---

## Refs (data-ref)

Use `data-ref` attributes to create element references:

```html
<div data-ref="title">Title</div>
<div data-ref="item">Item 1</div>
<div data-ref="item">Item 2</div>
```

Access in JS:
```javascript
this.refs.title        // Single element
this.refs.item         // Array of elements (when multiple)
```

---

## Settings (data-s-*)

Pass settings via data attributes:

```html
<c-slider data-s-autoplay="true" data-s-delay="5000">
```

Access in JS:
```javascript
this.settings.autoplay  // true (boolean)
this.settings.delay     // "5000" (string)
```

---

## Event Bus

Emit and listen to global events:

```javascript
// Emit
this.app.bus.emit('eventName', { data: 'payload' })

// Listen
this.app.bus.on('eventName', (payload) => {
	console.log(payload.data)
})

// Remove listener
this.app.bus.off('eventName', handler)
```

---

## SCSS Mixins Reference

### Spacing

```scss
@include default-side-margin;  // Standard page margin
@include v-spacing(property, mobile, desktop);  // Responsive value
```

### Media Queries

```scss
@include media('>medium') { }   // Above 1025px
@include media('<=small') { }   // 768px and below
@include media('>small', '<=large') { }  // Range
```

Breakpoints: xsmall(420), msmall(600), small(768), medium(1025), large(1440), xlarge(1800)

### Grid

```scss
@include grid-base;  // CSS Grid with columns
```

### Transitions

```scss
@include transition-enter;  // Entry transition setup
```

---

## Page System

Set page type via body attribute:

```astro
<body data-s-page="homepage">
```

Create page class in `src/js/pages/`. **Always use `Anims` presets for GSAP animations:**

```javascript
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

Register in `src/js/pages/index.js`:

```javascript
import homepage from './homepage'

export const pages = {
	default: defaultPage,
	homepage: homepage,
}
```

---

## Animation Presets

**Always use `Anims` presets for GSAP animations** to maintain consistency across the project. Never use raw GSAP options directly.

```javascript
import { Anims } from '@js/helpers/animations'
import GSAP from 'gsap'

// Page transitions
GSAP.to(element, Anims.pageTransitions.hide)
GSAP.from(element, Anims.pageTransitions.show)
```

Add new presets to `src/js/helpers/animations.js` as needed.

---

## Connectors

### Sanity CMS

See `connectors/sanity/README.md` for setup instructions.

```astro
---
import { getPages } from '@connectors/sanity/lib/sanity.js'
import CImage from '@connectors/sanity/components/c-Image/index.astro'

const pages = await getPages()
---

<CImage image={page.image} alt="..." />
```
