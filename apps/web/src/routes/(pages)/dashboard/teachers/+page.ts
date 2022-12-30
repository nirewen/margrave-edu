import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const teachers = await api.get<User[]>('/api/users?role=TEACHER')

    return { teachers }
}) satisfies PageLoad
