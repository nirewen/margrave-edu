import { loadWrapper as wrap } from '$lib/api'
import type { Lesson } from '$lib/types/api/Lesson'
import type { Stats } from '$lib/types/Stats'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    return {
        stats: api.get<Stats>('/api/stats'),
        lessons: api.get<Lesson[]>('/api/lessons'),
    }
}) satisfies PageLoad
