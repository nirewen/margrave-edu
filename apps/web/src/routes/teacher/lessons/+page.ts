import { loadWrapper as wrap } from '$lib/api'
import type { Lesson } from '$lib/types/api/Lesson'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const lessons = await api.get<Lesson[]>(`/api/lessons/@me`)

    return {
        lessons,
    }
}) satisfies PageLoad
