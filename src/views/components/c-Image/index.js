import { BaseElement } from '@js/core/base-element'

export const tagName = 'c-image'

export default class CImage extends BaseElement {
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
		debug.important('c-image connected')
	}

	onResize(_payload) {
		// debug.important('c-image onResize', _payload)
	}

	onDisconnected() {
		debug.important('c-image disconnected')
	}

	onEnter(entry) {
        this.element.classList.add(this.classes.isVisible)
	}

	onLeave(entry) {
		// this.element.classList.remove(this.classes.isVisible)
	}
}
