export function getClassesAndDataAttributes(data) {
	if (data.current.container) {
		let nextHtml = data.next.html
		let parser = new DOMParser()

		let htmlDoc = parser.parseFromString(nextHtml, 'text/html')
		let bodyClasses = htmlDoc.body.getAttribute('class')

		if (bodyClasses) {
			// Get existing body classes and split them
			let existingClasses = new Set(document.body.className.split(' '))

			// Filter persistent classes that are already present
			let persistentClasses = ['preloaded'].filter((className) => existingClasses.has(className))

			// Combine persistent classes with the new ones
			let newClasses = bodyClasses.split(' ').filter((className) => !persistentClasses.includes(className))
			let finalClasses = new Set([...persistentClasses, ...newClasses])

			// Update the body classes
			document.body.className = Array.from(finalClasses).join(' ')
		}

		// Update current-menu-item classes based on current URL
		let currentPath = window.location.pathname
		let allLinks = htmlDoc.querySelectorAll('a')

		allLinks.forEach((link) => {
			let linkPath = new URL(link.href, window.location.origin).pathname
			let existingLink = document.querySelector(`a[href="${link.getAttribute('href')}"]`)

			if (existingLink) {
				if (linkPath === currentPath && currentPath !== '/') {
					existingLink.classList.add('current-menu-item')
				} else {
					existingLink.classList.remove('current-menu-item')
				}
			}
		})

		// Handle data-vite-dev-id scripts
		let oldStyles = document.head.querySelectorAll('style')
		let newStyles = htmlDoc.head.querySelectorAll('style')

		// Create maps using a unique identifier (data-vite-dev-id or textContent hash)
		const getStyleKey = (style) => {
			// Use data-vite-dev-id if available
			const devId = style.getAttribute('data-vite-dev-id')
			if (devId) return `vite:${devId}`

			// Otherwise use content hash as identifier
			return `content:${style.textContent.trim()}`
		}

		let oldStyleMap = new Map()
		oldStyles.forEach((style) => {
			oldStyleMap.set(getStyleKey(style), style)
		})

		let newStyleMap = new Map()
		newStyles.forEach((style) => {
			newStyleMap.set(getStyleKey(style), style)
		})

		// Remove old styles that are no longer present
		oldStyleMap.forEach((style, key) => {
			if (!newStyleMap.has(key)) {
				style.remove()
			}
		})

		// Add or update styles
		newStyleMap.forEach((newStyle, devId) => {
			if (!oldStyleMap.has(devId)) {
				let styleClone = document.createElement('style')
				for (const attr of newStyle.attributes) {
					styleClone.setAttribute(attr.name, attr.value)
				}
				styleClone.textContent = newStyle.textContent
				document.head.appendChild(styleClone)
			}
		})

		// Remove all existing data attributes
		for (const attr of [...document.body.attributes]) {
			if (attr.name.startsWith('data-s')) {
				document.body.removeAttribute(attr.name)
			}
		}

		// Add new data attributes from incoming page
		let bodyDataAttrs = htmlDoc.body.attributes

		for (const attr of bodyDataAttrs) {
			// Sync all data-s-* attributes (settings)
			if (attr.name.startsWith('data-s')) {
				document.body.setAttribute(attr.name, attr.value)
			}
		}
	}
}
