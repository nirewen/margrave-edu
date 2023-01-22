import { loadWrapper as wrap } from '$lib/api'
import type { Class } from '$lib/types/api/Class'
import type { Classroom } from '$lib/types/api/Classroom'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    try {
        const classData = await api.get<Class>(`/api/classes/${params.id}`)
        const classrooms = await api.get<Classroom[]>('/api/classrooms')

        return { class: classData, classrooms }
    } catch (error) {
        throw redirect(301, '/admin/classes')
    }
}) satisfies PageLoad
