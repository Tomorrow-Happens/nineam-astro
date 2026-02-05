import { createClient } from '@sanity/client'

export const PREVIEW = process.env.PREVIEW === 'true'

/**
 * Create a Sanity client
 * Configure via environment variables:
 * - SANITY_PROJECT_ID
 * - SANITY_DATASET (default: 'production')
 * - SANITY_API_VERSION (default: '2024-01-01')
 * - SANITY_VIEWER_API_TOKEN (for preview mode)
 */
const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET || 'production',
	apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
	useCdn: true,
	token: PREVIEW ? process.env.SANITY_VIEWER_API_TOKEN : undefined,
	perspective: PREVIEW ? 'previewDrafts' : 'published',
})

/**
 * Example query - customize for your schema
 */
export async function getPages() {
	return await client.fetch(
		`*[_type == "page" && defined(slug.current)] {
			title,
			"slug": slug.current,
			// Add your fields here
		}`,
	)
}

/**
 * Example site options query
 */
export async function getSiteOptions() {
	return await client.fetch(
		`*[_type == "siteOptions"][0]{
			"faviconSvg": faviconSvg.asset->url,
			"faviconPng": faviconPng.asset->url,
			"ogImage": ogImage.asset->url,
			metaTitle,
			metaDescription,
		}`,
	)
}

export { client }
