import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'
import SplitText from 'gsap/src/SplitText'

if (!gsap.core.globals().ScrollTrigger) {
	gsap.registerPlugin(ScrollTrigger)
}

if (!gsap.core.globals().SplitText) {
	gsap.registerPlugin(SplitText)
}

if (!gsap.core.globals().DrawSVGPlugin) {
	gsap.registerPlugin(DrawSVGPlugin)
}

if (!gsap.core.globals().Flip) {
	gsap.registerPlugin(Flip)
}