import cookie from 'cookie'
import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/logout')) {
        const response = new Response('', { status: 302 })

        response.headers.append(
            'set-cookie',
            cookie.serialize('access_token', '', {
                expires: new Date(Date.now() - 3600),
            })
        )
        response.headers.append(
            'set-cookie',
            cookie.serialize('refresh_token', '', {
                expires: new Date(Date.now() - 3600),
            })
        )
        response.headers.set('Location', event.url.origin)

        return response
    }

    return await resolve(event)
}) satisfies Handle
