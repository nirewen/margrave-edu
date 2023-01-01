import { loadWrapper as wrap } from '$lib/api'
import type { Stats } from '$lib/types/Stats'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const stats = await api.get<Stats>('/api/stats')

    return {
        stats,
    }
}) satisfies PageLoad
