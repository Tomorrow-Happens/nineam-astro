import GSAP from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
GSAP.registerPlugin(CustomEase)

CustomEase.create('anticipation', 'M0,0 C0.3,-0.43 0,1 1,1')

/**
 * Animation presets - customize these for your project
 * Usage: GSAP.to(element, Anims.fadeIn)
 */
const Anims = {
	pageTransitions: {
		hide: {
			opacity: 0,
			duration: 0.4,
		},
		show: {
			opacity: 1,
			duration: 0.4,
		}
	}
}

export { Anims }
