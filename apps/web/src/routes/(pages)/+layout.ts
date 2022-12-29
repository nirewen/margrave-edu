import { loadWrapper as wrap } from '$lib/api'
import type { User } from 'src/types/User'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = wrap(async ({ api }) => {
    const user = await api.get<User>('/api/users/@me')

    return { user }
})
