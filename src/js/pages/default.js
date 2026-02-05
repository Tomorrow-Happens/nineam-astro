import Page from './page'
import gsap from 'gsap'
import { Anims } from '@js/helpers/animations'

export default class DefaultPage extends Page {
	onConnected() {
		super.onConnected()
		debug('default page onConnected')
	}
	onDisconnected() {
		super.onDisconnected()
		debug('default page onDisconnected')
	}
	onResize(_payload) {
		super.onResize(_payload)
		debug('default page onResize', _payload)
	}
	onTick(_t) {
		super.onTick(_t)
		// debug('default page onTick', _t)
	}

	async once(data) {
		debug('default page once', data)
	}

	async hide(data) {
		debug('default page hide', data)

		return gsap.to(data.current.container, Anims.pageTransitions.hide)
	}

	async show(data) {
		debug('default page show', data)
		return gsap.from(data.next.container, Anims.pageTransitions.show)
	}
}
