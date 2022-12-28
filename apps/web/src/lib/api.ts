import { redirect, type Load, type LoadEvent } from '@sveltejs/kit'

export function wrap(callback: Load) {
    return ({ fetch, ...rest }: LoadEvent) => {
        async function fetcher(input: RequestInfo | URL, init?: RequestInit): Promise<any> {
            const response = await fetch(input, init)
            const json = await response.json()

            if (json.status === 401) {
                const response = await fetch('/api/auth/refresh', { method: 'POST' })
                const json = await response.json()

                if (json.status === 401) {
                    throw redirect(301, '/login')
                }

                return fetcher(input, init)
            }

            return new Response(JSON.stringify(json))
        }

        return callback({ fetch: fetcher, ...rest })
    }
}
