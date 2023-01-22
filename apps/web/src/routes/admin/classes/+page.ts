import { loadWrapper as wrap } from '$lib/api'
import type { Class } from '$lib/types/api/Class'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const classes = await api.get<Class[]>('/api/classes')

    return { classes }
}) satisfies PageLoad
