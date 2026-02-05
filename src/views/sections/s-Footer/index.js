import { BaseElement } from '@js/core/base-element'

export const tagName = 's-footer'

export default class SFooter extends BaseElement {
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
		debug.important('s-footer connected')
	}

	onResize(_payload) {
		// debug.important('s-footer onResize', _payload)
	}

	onDisconnected() {
		debug.important('s-footer disconnected')
	}

	onEnter(entry) {
        this.element.classList.add(this.classes.isVisible)
	}

	onLeave(entry) {
		// this.element.classList.remove(this.classes.isVisible)
	}
}
