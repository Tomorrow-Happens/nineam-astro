export function autoRegisterCustomElements(app) {
	const modules = import.meta.glob('@views/**/index.js', { eager: true })
	Object.values(modules).forEach((mod) => {
		const Ctor = mod.default
		const tag = mod.tagName || Ctor?.tagName
		if (!tag || !Ctor) return

		// inject `app` onto the class
		Ctor.app = app

		if (!customElements.get(tag)) {
			customElements.define(tag, Ctor)
		}
	})
}
