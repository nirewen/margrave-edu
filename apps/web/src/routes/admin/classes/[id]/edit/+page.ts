import { loadWrapper as wrap } from '$lib/api'
import type { Class } from '$lib/types/api/Class'
import type { Classroom } from '$lib/types/api/Classroom'
import type { Subject } from '$lib/types/api/Subject'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    try {
        return {
            class: api.get<Class>(`/api/classes/${params.id}`),
            classrooms: api.get<Classroom[]>('/api/classrooms'),
            subjects: api.get<Subject[]>('/api/subjects'),
        }
    } catch (error) {
        throw redirect(301, '/admin/classes')
    }
}) satisfies PageLoad
