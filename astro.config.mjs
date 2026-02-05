// @ts-check
import { defineConfig } from 'astro/config'
import netlify from '@astrojs/netlify'
import 'dotenv/config'

const PREVIEW = process.env.PREVIEW === 'true'

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'http://localhost:4321/',
	devToolbar: {
		enabled: false,
	},
	trailingSlash: 'always',
	output: PREVIEW ? 'server' : 'static',
	vite: {
		build: {
			cssCodeSplit: true,
		},
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ['import', 'global-builtin', 'if-function', 'slash-div'],
					quietDeps: true,
				},
			},
		},
	},
	adapter: netlify(),
})
