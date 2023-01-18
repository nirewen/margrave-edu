import { redirect, type LoadEvent, type RequestEvent } from '@sveltejs/kit'
import { APIError } from '$lib/types/APIError'

const fetcher = (fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
    return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const response = await fetch(input, init)
        const json = await response.json()

        if (json.status === 401) {
            const response = await fetch('/api/auth/refresh', { method: 'POST' })
            const json = await response.json()

            if (json.status === 401) {
                throw redirect(302, '/login')
            }

            return fetcher(fetch)(input, init)
        }

        return new Response(JSON.stringify(json), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        })
    }
}

const api = (fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
    const get = async <ResponseType>(url: string, options?: RequestInit) => {
        const response = await fetch(url, {
            method: 'GET',
            ...options,
        })
        const json = await response.json()

        if (!response.ok) {
            throw new APIError(json as APIError)
        }

        return json as ResponseType
    }
    const post = async <ResponseType>(url: string, data: object, options?: RequestInit) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...options,
        })
        const json = await response.json()

        if (!response.ok) {
            throw new APIError(json as APIError)
        }

        return json as ResponseType
    }
    const patch = async <ResponseType>(url: string, data: object, options?: RequestInit) => {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...options,
        })
        const json = await response.json()

        if (!response.ok) {
            throw new APIError(json as APIError)
        }

        return json as ResponseType
    }
    const deleteFn = async <ResponseType>(url: string, options?: RequestInit) => {
        const response = await fetch(url, {
            method: 'DELETE',
            ...options,
        })
        const json = await response.json()

        if (!response.ok) {
            throw new APIError(json as APIError)
        }

        return json as ResponseType
    }

    return { get, post, patch, delete: deleteFn }
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
