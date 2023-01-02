import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    const users = await api.get<User[]>('/api/users')

    return { users }
}) satisfies PageLoad
