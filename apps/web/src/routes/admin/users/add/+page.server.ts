import { actionWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api, url }) => {
        const { role } = Object.fromEntries(url.searchParams)
        const formData = await request.formData()
        const email = formData.get('email')
        const password = formData.get('password')

        const response = await api.post<User>('/api/users', {
            email,
            password,
            role,
        })

        throw redirect(301, `/admin/users/${response.id}/edit`)
    }),
}
