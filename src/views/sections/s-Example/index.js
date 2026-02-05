import { BaseElement } from '@js/core/base-element'

export const tagName = 's-example'

export default class SExample extends BaseElement {
	constructor() {
		super({
			state: {},
			classes: {
				isVisible: 'is-visible',
			},
			settings: {
				intersectionOnce: true,
			},
			params: {},
		})
	}

	onConnected() {
		// Setup code here
	}

	onEnter(entry) {
		this.element.classList.add(this.classes.isVisible)
	}
}
