import { redirect, type LoadEvent, type RequestEvent } from '@sveltejs/kit'

const fetcher = (fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
    return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const response = await fetch(input, init)
        const json = await response.json()

        if (json.status === 401) {
            const response = await fetch('/api/auth/refresh', { method: 'POST' })
            const json = await response.json()

            if (json.status === 401) {
                throw redirect(301, '/login')
            }

            return fetcher(fetch)(input, init)
        }

        return new Response(JSON.stringify(json))
    }
}

const api = (fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
    const get = <ReturnType>(url: string) => fetch(url).then(r => r.json() as ReturnType)
    const post = <ReturnType>(url: string, data: object, options?: RequestInit) =>
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...options,
        }).then(r => r.json() as ReturnType)

    return { get, post }
}

// TODO: arranjar um jeito de juntar essas duas
type WrapperEvent<Event> = { api: ReturnType<typeof api> } & Event

export function loadWrapper<T extends (event: WrapperEvent<LoadEvent>) => ReturnType<T>>(callback: T) {
    return ({ fetch, ...event }: LoadEvent) => {
        return callback({ api: api(fetcher(fetch)), fetch: fetcher(fetch), ...event })
    }
}

export function actionWrapper<T extends (event: WrapperEvent<RequestEvent>) => ReturnType<T>>(callback: T) {
    return ({ fetch, ...event }: RequestEvent) => {
        return callback({ api: api(fetcher(fetch)), fetch: fetcher(fetch), ...event })
    }
}
