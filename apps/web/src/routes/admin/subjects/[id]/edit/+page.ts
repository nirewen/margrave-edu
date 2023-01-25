import { loadWrapper as wrap } from '$lib/api'
import type { Subject } from '$lib/types/api/Subject'
import type { User } from '$lib/types/User'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    try {
        return {
            subject: api.get<Subject>(`/api/subjects/${params.id}`),
            teachers: api.get<User[]>('/api/users?role=TEACHER'),
        }
    } catch (error) {
        throw redirect(301, '/admin/subjects')
    }
}) satisfies PageLoad
