import { actionWrapper as wrap } from '$lib/api'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from '$lib/types/APIError'
import type { Actions } from './$types'
import type { User } from '$lib/types/User'

export const actions: Actions = {
    login: wrap(async ({ request, api }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        try {
            const response = await api.post<User>('/api/auth/signin', {
                email,
                password,
            })

            throw redirect(307, `/${response.role.toLowerCase()}/dashboard/`)
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    error: true,
                    message: error.message,
                })
            }

            throw error
        }
    }),
}
