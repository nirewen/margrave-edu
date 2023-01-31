import { loadWrapper as wrap } from '$lib/api'
import type { Lesson } from '$lib/types/api/Lesson'
import type { PageData } from './$types'

export const load = wrap(async ({ api, params }) => {
    const lesson = await api.get<Lesson>(`/api/lessons/${params.id}`)

    return {
        lesson,
    }
}) satisfies PageData
