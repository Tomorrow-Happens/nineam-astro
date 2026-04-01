import { BaseElement } from '@js/core/base-element'

export const tagName = 'c-image'

export default class CImage extends BaseElement {
	constructor() {
		super({
			state: {},
			classes: {
				isVisible: 'is-visible',
				isLoaded: 'is-loaded',
			},
			settings: {
				intersectionOnce: true,
			},
			params: {},
		})
	}

	onConnected() {
		const img = this.refs.img
		if (!img) return

		if (img.complete) {
			this.element.classList.add(this.classes.isLoaded)
		} else {
			img.addEventListener('load', this._onLoad = () => {
				this.element.classList.add(this.classes.isLoaded)
			}, { once: true })
		}
	}

	onDisconnected() {
		const img = this.refs.img
		if (img && this._onLoad) {
			img.removeEventListener('load', this._onLoad)
		}
	}

	onEnter(entry) {
		this.element.classList.add(this.classes.isVisible)
	}
}
