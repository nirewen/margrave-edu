import { wrap } from '$lib/api'
import type { User } from 'src/types/user'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = wrap(async ({ fetch }) => {
    const response = await fetch('/api/users/@me')
    const user: User = await response.json()

    return { user }
})
