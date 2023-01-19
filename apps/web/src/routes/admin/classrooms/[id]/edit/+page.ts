import { loadWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import type { User } from '$lib/types/User'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    try {
        const classroom = await api.get<Classroom>(`/api/classrooms/${params.id}`)

        return { classroom }
    } catch (error) {
        throw redirect(301, '/admin/classrooms')
    }
}) satisfies PageLoad
