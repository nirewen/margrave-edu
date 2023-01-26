import { redirect } from '@sveltejs/kit'

import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { RoleID } from '$lib/util'
import type { LayoutLoad } from './$types'

export const trailingSlash = 'always'

const protectedRoutes: { route: string; roles: RoleID[] }[] = [
    { route: '/admin', roles: ['ADMIN'] },
    { route: '/teacher', roles: ['TEACHER'] },
    { route: '/student', roles: ['STUDENT'] },
]

export const load: LayoutLoad = wrap(async ({ api, url }) => {
    const user = await api.get<User>('/api/users/@me').catch(() => null)
    const route = protectedRoutes.find(r => url.pathname.startsWith(r.route))

    // in case of protected route - redirect user to correct panel
    if (user && route && !route.roles.includes(user.role)) {
        url.pathname = url.pathname.replace(route.route, user.role.toLowerCase())

        throw redirect(303, url.toString())
    }

    return { user }
})
