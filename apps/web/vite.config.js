import { sveltekit } from '@sveltejs/kit/vite'
import { ssp } from 'sveltekit-search-params/plugin'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [ssp(), sveltekit()],
    server: {
        proxy: {
            '/api': 'http://localhost:3001',
        },
    },
}

export default config
