import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    server: {
        proxy: {
            '/api': 'http://localhost:3001',
        },
    },
}

export default config
