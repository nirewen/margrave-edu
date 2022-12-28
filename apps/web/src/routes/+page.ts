import type { PageLoad } from './$types'

import { wrap } from '$lib/api'

export const load = wrap(async ({ fetch }) => {
    const response = await fetch('/api/users/@me')

    return response
}) satisfies PageLoad
