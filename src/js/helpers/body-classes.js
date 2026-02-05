export function generateBodyClasses(pathname) {
	let bodyClass = ''

	if (pathname === '/') {
		bodyClass = 'index'
	} else {
		const cleanPath = pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-')
		bodyClass = cleanPath ? `page page-${cleanPath}` : 'page-generic'
	}

	return bodyClass
}

/**
 *
 * YOU'RE USING YOUR OWN SETUP VIA barba.js
 */
export function setBodyClasses(data) {
	const nextHtml = data.next.html

	//converts the HTML string into a DOM so you can query it like normal.
	const parser = new DOMParser()

	// gives the body tag
	const htmlDoc = parser.parseFromString(nextHtml, 'text/html')

	// gets the classes
	const classes = htmlDoc.body.getAttribute('class') || ''

	// sets the classes
	document.body.setAttribute('class', classes)
}
