export function isTouchDevice() {
	const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

	document.body.classList.add(isTouch ? 'touchscreen' : 'desktop')
	return isTouch
}

export function setElementViewportHeight() {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}
