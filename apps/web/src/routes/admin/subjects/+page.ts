import { loadWrapper as wrap } from '$lib/api'
import type { Subject } from '$lib/types/api/Subject'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const subjects = await api.get<Subject[]>('/api/subjects')

    return { subjects }
}) satisfies PageLoad
