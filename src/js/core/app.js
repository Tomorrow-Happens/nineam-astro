import mitt from 'mitt'
import { autoRegisterCustomElements } from './registry'
import { pages } from '@js/pages'
import { Router } from '@js/plugins/router'
import { breakpoints } from '@js/helpers/breakpoints'
import { getSettings } from '@js/helpers/dom'

export class App {
	static _i

	static get() {
		return this._i ?? (this._i = new App())
	}

	constructor() {

		this.bus = mitt()
		this.actors = new Set()
		this.router = new Router(this)

		this.globals = {
			breakpoint: this._bp(innerWidth),
			isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
			env: import.meta.env.MODE,
			settings: getSettings(document.body),
		}

		autoRegisterCustomElements(this)

		this.mountPage()
		this._bindResize()
		this._tick = this._tick.bind(this)

		requestAnimationFrame(this._tick)
	}

	// Actors: Pages/sections/components
	attach(actor) {
		if (actor && !this.actors.has(actor)) {
			this.actors.add(actor)
			actor.onConnected?.(this)
		}
	}

	detach(actor) {
		if (actor && this.actors.has(actor)) {
			actor.onDisconnected?.(this)
			this.actors.delete(actor)
		}
	}

	// Page management
	getPage() {
		const slug = document.body.getAttribute('data-s-page') || 'default'
		const Ctor = pages[slug] || pages.default
		this.page = new Ctor(this)
		this.page.slug = slug
	}

	mountPage() {
		this.getPage()
		if (!this.page) return
		this.attach(this.page)
	}

	unmountPage() {
		if (!this.page) return
		this.detach(this.page)
		this.page = null
	}

	// Update loop
	_tick(now) {
		const t = {
			time: now / 1000,
			dt: this._last ? (now - this._last) / 1000 : 0,
			frame: (this._frame = (this._frame || 0) + 1),
		}
		this._last = now
		this.actors.forEach((a) => a.onTick?.(t))

		requestAnimationFrame(this._tick)
	}

	// Resize handling
	_bindResize() {
		const emit = () => {
			const payload = {
				width: innerWidth,
				height: innerHeight,
				dpr: devicePixelRatio || 1,
				breakpoint: this._bp(innerWidth),
			}
			this.globals.breakpoint = payload.breakpoint
			this.actors.forEach((a) => a.onResize?.(payload))
			this.bus.emit('resize', payload)
		}
		addEventListener('resize', emit, { passive: true })
		addEventListener('orientationchange', emit, { passive: true })
	}

	_bp(w) {
		for (const [key, value] of Object.entries(breakpoints).reverse()) {
			if (w >= value) return key
		}
		return 'xsmall'
	}
}
