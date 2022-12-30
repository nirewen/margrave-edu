import { redirect } from '@sveltejs/kit'

import { loadWrapper as wrap } from '$lib/api'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api }) => {
    await api.get('/api/auth/logout')

    throw redirect(301, '/login')
}) satisfies PageLoad
