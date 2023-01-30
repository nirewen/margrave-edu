import { loadWrapper as wrap } from '$lib/api'
import type { Lesson } from '$lib/types/api/Lesson'
import type { LayoutLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    return {
        lesson: api.get<Lesson>(`/api/lessons/${params.id}`),
    }
}) satisfies LayoutLoad
