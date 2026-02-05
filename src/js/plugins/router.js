import Barba from '@barba/core'
import { getClassesAndDataAttributes } from '@js/helpers/barba'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export class Router {
	constructor(app) {
		this.app = app
		this.barba = Barba.init({
			schema: {
				prefix: 'data-transition',
			},
			debug: true,
			transitions: [
				{
					name: 'default',
					once: async (data) => {
						await this.app.page?.once?.(data)
					},
					leave: async (data) => {
						await this.app.page?.hide?.(data)
					},
					beforeEnter: async (data) => {
						this.app.unmountPage()
						getClassesAndDataAttributes(data)
					},
					after: async (data) => {
						this.app.mountPage()
						window.scrollTo(0, 0)
						await this.app.page?.show?.(data)
						requestAnimationFrame(() => ScrollTrigger.refresh())
					},
				},
			],
		})
	}
}
