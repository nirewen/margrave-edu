import { loadWrapper as wrap } from '$lib/api'
import type { Class } from '$lib/types/api/Class'
import type { Subject } from '$lib/types/api/Subject'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    return {
        subjects: api.get<Subject[]>('/api/subjects'),
        classes: api.get<Class[]>(`/api/classes`),
    }
}) satisfies PageLoad
