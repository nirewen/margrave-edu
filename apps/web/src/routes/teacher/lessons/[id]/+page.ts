import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { LayoutData, PageLoad } from './$types'

export const load = wrap(async ({ api, params, parent }) => {
    const data = (await parent()) as LayoutData

    return {
        students: api.get<User[]>(`/api/classes/${data.lesson.class.id}/students`),
    }
}) satisfies PageLoad
