import { loadWrapper as wrap } from '$lib/api'
import type { Class } from '$lib/types/api/Class'
import type { Subject } from '$lib/types/api/Subject'
import type { User } from '$lib/types/User'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    try {
        const subject = await api.get<Subject>(`/api/subjects/${params.id}`)
        const teachers = await api.get<User[]>('/api/users?role=TEACHER')
        const classes = await api.get<Class[]>('/api/classes')

        return { subject, teachers, classes }
    } catch (error) {
        throw redirect(301, '/admin/subjects')
    }
}) satisfies PageLoad
