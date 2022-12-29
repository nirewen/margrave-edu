import { wrap } from '$lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = wrap(async ({ fetch }) => {
    const stats = await fetch('/api/stats').then(r => r.json())

    return {
        stats,
    }
})
