import { loadWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    return {
        classrooms: api.get<Classroom[]>('/api/classrooms'),
    }
}) satisfies PageLoad
