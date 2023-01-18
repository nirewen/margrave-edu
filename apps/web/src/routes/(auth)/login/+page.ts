import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = (async ({ parent }) => {
    const data = await parent()

    if (data.user) {
        throw redirect(302, `/${data.user.role.toLowerCase()}/dashboard`)
    }
}) satisfies PageLoad
