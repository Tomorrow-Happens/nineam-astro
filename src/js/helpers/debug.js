export function debug(message, dataOrImportant = undefined, important = false) {
	if (import.meta.env.MODE !== 'development') return

	// allow debug('msg', true) without data
	let data = undefined
	if (typeof dataOrImportant === 'boolean') {
		important = dataOrImportant
	} else {
		data = dataOrImportant
	}

	// styles
	const normal = 'color:#b8c0cc; font-weight:400;' // light
	const strong = 'color:#2b74ff; font-weight:700;' // bold + blue
	const style = important ? strong : normal

	const label = important ? '[DEBUG!]' : '[DEBUG]'
	// one %c so the whole message text is a single colour
	if (typeof data !== 'undefined') {
		console.log(`%c${label} ${message}`, style, data)
	} else {
		console.log(`%c${label} ${message}`, style)
	}
}

window.debug = debug
// handy helper
debug.important = (message, data) => debug(message, data, true)
