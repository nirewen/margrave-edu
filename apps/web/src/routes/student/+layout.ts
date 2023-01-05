import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = wrap(async ({ api }) => {
    const user = await api.get<User>('/api/users/@me')

    if (user.role !== 'STUDENT') {
        // TODO: MOVER ISSO PRA HOOKS
        throw error(403, {
            message: '',
        })
    }

    return { user }
})
