export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max)
}

export function lerp(a, b, t) {
	return a + (b - a) * t
}

export function padNumber(num, size = 2) {
	return String(num).padStart(size, '0')
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function unique(array) {
	return [...new Set(array)]
}

export function calculateDistance(x1, y1, x2, y2) {
	return Math.hypot(x1 - x2, y1 - y2)
}
