export function debounce(fn, wait = 200) {
	let timeout
	return (...args) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => fn.apply(this, args), wait)
	}
}

export function throttle(fn, limit = 200) {
	let inThrottle
	return (...args) => {
		if (!inThrottle) {
			fn.apply(this, args)
			inThrottle = true
			setTimeout(() => (inThrottle = false), limit)
		}
	}
}
