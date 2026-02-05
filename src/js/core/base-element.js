import { getSettings } from '@js/helpers/dom'

/**
 * Base class for all custom elements in the boilerplate.
 * Provides lifecycle hooks, ref binding, state management, and intersection observation.
 *
 * @example
 * import { BaseElement } from '@js/core/base-element'
 *
 * export const tagName = 'c-example'
 *
 * export default class CExample extends BaseElement {
 *   constructor() {
 *     super({
 *       state: { isActive: false },
 *       classes: { isVisible: 'is-visible' },
 *       settings: { intersectionOnce: true },
 *     })
 *   }
 *
 *   onConnected() {
 *     console.log('Component mounted')
 *   }
 *
 *   onEnter(entry) {
 *     this.element.classList.add(this.classes.isVisible)
 *   }
 * }
 *
 * Lifecycle hooks:
 * - onInit() - Called in constructor, before DOM is ready
 * - onConnected() - Called when element is added to DOM
 * - onDisconnected() - Called when element is removed from DOM
 * - onResize({ width, height, dpr, breakpoint }) - Called on window resize
 * - onTick({ time, dt, frame }) - Called every animation frame
 * - onEnter(entry) - Called when element enters viewport
 * - onLeave(entry) - Called when element leaves viewport
 * - onSettingsChanged(newSettings) - Called when data-s attribute changes
 */
export class BaseElement extends HTMLElement {
	constructor(args = {}) {
		super()
		const { classes, state, options, params, settings } = args
		this.refs = Object.create(null)
		this.state = state || {}
		this.app = this.constructor.app
		this.classes = classes || {}
		this.params = params || {}
		this.options = options || {}
		this.element = this

		this.options = this._getDataOptions(this.options)
		this.settings = { ...(settings || {}), ...getSettings(this.element) }

		// Intersection Observer properties
		this._observer = null
		this._hasEntered = false
		this._isIntersecting = false

		this.onInit?.() // optional early hook
	}

	connectedCallback() {
		// this._bindRefs()
		this.__createRefs()
		this._setupIntersectionObserver()
		this.app.attach(this)
	}

	disconnectedCallback() {
		this._cleanupIntersectionObserver()
		this.app.detach(this)
	}

	attributeChangedCallback(name, _oldV, _newV) {
		if (name === 'data-s') {
			this.settings = this._readSettings()
			this.onSettingsChanged?.(this.settings) // optional
		}
	}

	// ---------- Intersection Observer setup ----------
	_setupIntersectionObserver() {
		// Only setup if component has onEnter or onLeave methods
		if (!this.onEnter && !this.onLeave) return

		// Get intersection options from settings or defaults
		const threshold = this.settings.intersectionThreshold ?? 0.1
		const rootMargin = this.settings.intersectionMargin ?? '0px'
		const triggerOnce = this.settings.intersectionOnce ?? false

		const options = {
			threshold: parseFloat(threshold),
			rootMargin: rootMargin,
		}

		this._observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const wasIntersecting = this._isIntersecting
				this._isIntersecting = entry.isIntersecting

				if (entry.isIntersecting && !wasIntersecting) {
					// Element entering viewport
					this.onEnter?.(entry)

					if (triggerOnce) {
						this._hasEntered = true
					}
				} else if (!entry.isIntersecting && wasIntersecting) {
					// Element leaving viewport
					this.onLeave?.(entry)

					// If triggerOnce and we've both entered and left, disconnect
					if (triggerOnce && this._hasEntered) {
						this._cleanupIntersectionObserver()
					}
				}
			})
		}, options)

		this._observer.observe(this.element)
	}

	_cleanupIntersectionObserver() {
		if (this._observer) {
			this._observer.disconnect()
			this._observer = null
		}
	}

	// ---------- convenience ----------
	_bindRefs() {
		this.refs = Object.create(null)
		this.querySelectorAll('[data-ref]').forEach((el) => {
			const k = el.getAttribute('data-ref')
			if (k) this.refs[k] = el
		})
	}

	__createRefs() {
		this.refs = [...this.element.querySelectorAll('[data-ref]')].reduce((acc, el) => {
			const refName = el.dataset.ref

			if (!acc[refName]) {
				acc[refName] = el // Default to single element
			} else if (Array.isArray(acc[refName])) {
				acc[refName].push(el) // Already an array, push new element
			} else {
				acc[refName] = [acc[refName], el] // Convert single element to array
			}

			return acc
		}, {})
	}

	_getDataOptions() {
		try {
			return { ...this.options, ...(JSON.parse(this.getAttribute('data-options')) || {}) }
		} catch {
			return { ...this.options }
		}
	}

	__setState(changes) {
		let stateChanges = {}

		Object.keys(changes).forEach((key) => {
			if (this.state.hasOwnProperty(key)) {
				if (this.state[key] !== changes[key]) {
					stateChanges[key] = changes[key]
					this.state[key] = stateChanges[key]
				}
			}
		})

		this.__onStateChange(stateChanges)
	}

	__onStateChange(stateChanges) {
		// console.log('State changes:', stateChanges)
	}

	/** Read a setting with fallback */
	getSetting(key, fallback = undefined) {
		return this.settings && key in this.settings ? this.settings[key] : fallback
	}

	/** Emit an event on the global bus */
	emit(event, payload) {
		this.app?.bus?.emit?.(event, payload)
	}

	// ---------- optional hooks you can implement in subclasses ----------
	// onInit() {}
	// onConnected() {}
	// onDisconnected() {}
	// onResize({ width, height, dpr, breakpoint }) {}
	// onTick({ time, dt, frame }) {}
	// onSettingsChanged(newSettings) {}
	// onEnter(entry) {} // NEW: Called when element enters viewport
	// onLeave(entry) {} // NEW: Called when element leaves viewport
}
