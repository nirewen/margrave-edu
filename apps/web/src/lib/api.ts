import Kit, { redirect } from '@sveltejs/kit'

const api = (fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
    const get = <T>(url: string) => fetch(url).then(r => r.json() as T)
    const post = <T>(url: string, data: T, options?: RequestInit) =>
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...options,
        }).then(r => r.json() as T)

    return { get, post }
}

type LoadEvent = { api: ReturnType<typeof api> } & Kit.LoadEvent

export function wrap<T extends (event: LoadEvent) => ReturnType<T>>(callback: T) {
    return ({ fetch, ...rest }: Kit.LoadEvent) => {
        async function fetcher(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
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

        return callback({ api: api(fetcher), fetch: fetcher, ...rest })
    }
}
