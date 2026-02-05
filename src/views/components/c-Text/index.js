import { BaseElement } from '@js/core/base-element'

export const tagName = 'c-text'

export default class CText extends BaseElement {
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
		debug.important('c-text connected')
	}

	onResize(_payload) {
		// debug.important('c-text onResize', _payload)
	}

	onDisconnected() {
		debug.important('c-text disconnected')
	}

	onEnter(entry) {
        this.element.classList.add(this.classes.isVisible)
	}

	onLeave(entry) {
		// this.element.classList.remove(this.classes.isVisible)
	}
}
