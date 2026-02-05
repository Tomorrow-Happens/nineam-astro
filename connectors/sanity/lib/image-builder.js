import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.js'

const builder = imageUrlBuilder(client)

/**
 * Build a Sanity image URL
 * @param {object} source - Sanity image object with asset._ref
 * @returns {ImageUrlBuilder}
 *
 * @example
 * urlFor(image).width(800).url()
 * urlFor(image).width(400).height(300).format('webp').url()
 */
export function urlFor(source) {
	return builder.image(source)
}
