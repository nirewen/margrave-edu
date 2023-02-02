import { loadWrapper as wrap } from '$lib/api'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ parent }) => {
    const data = await parent()

    if (data.user) {
        throw redirect(302, `/${data.user.role.toLowerCase()}/dashboard`)
    } else {
        throw redirect(302, '/login/')
    }
}) satisfies PageLoad
