import gsap from 'gsap'

export default class Page {
	constructor(app) {
		this.app = app
		this.slug = null // optional; set by subclass if you like
	}

	onConnected() {
		// when App.attach(this) runs
		debug('page.js onConnected')
	}

	onDisconnected() {
		// when App.detach(this) runs
		//debug('page.js onDisconnected')
	}
	onResize(_payload) {
		// global resize (from App)
		//debug('page.js onResize', _payload)
	}
	onTick(_t) {
		// global tick (from App)
		// debug(this.app, 'page.js onTick', _t)
	}

	// Animations
	once(data) {
		//debug('page.js once', data)
	}

	async hide(data) {
		// console.log(data)
	}

	async show(data) {
		//debug('page.js show', data)
	}
}
