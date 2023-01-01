import { loadWrapper as wrap } from '$lib/api'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(({ url }) => {
    const query = Object.fromEntries(url.searchParams)

    if (!['ADMIN', 'TEACHER', 'STUDENT'].includes(query.role)) {
        throw redirect(301, './add?role=STUDENT')
    }

    return { query }
}) satisfies PageLoad
