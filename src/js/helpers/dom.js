import { toCamelCase } from './string'

export function qs(selector, scope = document) {
	return scope.querySelector(selector)
}

export function qsa(selector, scope = document) {
	return Array.from(scope.querySelectorAll(selector))
}

export function createElement(tag, attrs = {}, children = []) {
	const el = document.createElement(tag)
	Object.entries(attrs).forEach(([key, value]) => {
		if (key.startsWith('data-')) {
			el.setAttribute(key, value)
		} else if (key in el) {
			el[key] = value
		} else {
			el.setAttribute(key, value)
		}
	})
	children.forEach((child) => el.append(child.nodeType ? child : document.createTextNode(child)))
	return el
}

export function getSettings(element) {
	const settings = {}
	for (const attribute of element.attributes) {
		if (attribute.name.startsWith('data-s-')) {
			const key = toCamelCase(attribute.name.replace('data-s-', ''))

			settings[key] = parseAttribute(attribute.value)
		}
	}
	return settings
}

export function parseAttribute(value) {
	try {
		return JSON.parse(value)
	} catch (e) {
		return value
	}
}

export function getSiteSettingsAsAttributes() {
	const body = document.body
	const attributes = {}
	if (body) {
		for (const attr of body.attributes) {
			attributes[attr.name] = attr.value
		}
	}
	return attributes
}

export function getBodyAttribute(attr = 'data-s-theme') {
	return document.body.getAttribute(attr)
}
