import { loadWrapper as wrap } from '$lib/api'
import type { Lesson } from '$lib/types/api/Lesson'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    return {
        lessons: api.get<Lesson[]>('/api/lessons/@me'),
    }
}) satisfies PageLoad
