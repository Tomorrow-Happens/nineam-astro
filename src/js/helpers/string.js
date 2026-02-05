export function toCamelCase(str) {
	return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function toKebabCase(str) {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/\s+/g, '-')
		.toLowerCase()
}

export function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // strip accents
		.replace(/[^a-z0-9]+/g, '-') // non alphanum → dash
		.replace(/^-+|-+$/g, '')
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatRoutePath(path) {
	if (!path || path === '/') return ''
	return path
		.replace(/^\/+|\/+$/g, '')
		.replace(/-+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}
