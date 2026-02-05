import { BaseElement } from './base-element'

/**
 * Simplified component base class with sensible defaults.
 * Extend this class for components that don't need custom configuration.
 *
 * @example
 * // Simple component - no constructor needed
 * import { Component } from '@js/core/component'
 *
 * export const tagName = 'c-card'
 *
 * export default class CCard extends Component {
 *   onEnter() {
 *     this.show()
 *   }
 * }
 *
 * @example
 * // With custom state
 * export default class CCounter extends Component {
 *   static config = {
 *     state: { count: 0 }
 *   }
 *
 *   increment() {
 *     this.setState({ count: this.state.count + 1 })
 *   }
 * }
 */
export class Component extends BaseElement {
	static config = {}

	static defaults = {
		state: {},
		classes: { isVisible: 'is-visible' },
		settings: { intersectionOnce: true },
		params: {},
	}

	constructor(overrides = {}) {
		const config = {
			...Component.defaults,
			...this.constructor.config,
			...overrides,
		}
		super(config)
	}

	// Convenience methods

	/**
	 * Show the component (adds isVisible class)
	 */
	show() {
		this.element.classList.add(this.classes.isVisible)
	}

	/**
	 * Hide the component (removes isVisible class)
	 */
	hide() {
		this.element.classList.remove(this.classes.isVisible)
	}

	/**
	 * Toggle visibility
	 */
	toggle() {
		this.element.classList.toggle(this.classes.isVisible)
	}

	/**
	 * Query selector shorthand
	 * @param {string} selector
	 * @returns {Element|null}
	 */
	$(selector) {
		return this.element.querySelector(selector)
	}

	/**
	 * Query selector all shorthand
	 * @param {string} selector
	 * @returns {Element[]}
	 */
	$$(selector) {
		return [...this.element.querySelectorAll(selector)]
	}

	/**
	 * Autobind methods to this instance
	 * @param {...string} methods - Method names to bind
	 */
	_autobind(...methods) {
		methods.forEach((method) => {
			if (typeof this[method] === 'function') {
				this[method] = this[method].bind(this)
			}
		})
	}

	/**
	 * Set state with change tracking
	 * @param {object} changes - State changes
	 */
	setState(changes) {
		this.__setState(changes)
	}
}

export default Component
