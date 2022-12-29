import { loadWrapper as wrap } from '$lib/api'
import type { PageLoad } from './$types'

type Stats = {
    assignments: number
    classes: number
    lessons: number
    subjects: number
    users: number
    students: number
    teachers: number
}

export const load = wrap(async ({ api }) => {
    const stats = await api.get<Stats>('/api/stats')

    return {
        stats,
    }
}) satisfies PageLoad
