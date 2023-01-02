import { loadWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    try {
        const student = await api.get<User & { password: string }>(`/api/users/${params.id}`)

        return { student }
    } catch (error) {
        throw redirect(301, '/students')
    }
}) satisfies PageLoad
