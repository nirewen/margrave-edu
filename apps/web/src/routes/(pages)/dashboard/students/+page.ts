import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const students = await api.get<User[]>('/api/users?role=STUDENT')

    return { students }
}) satisfies PageLoad
