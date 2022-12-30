import { actionWrapper as wrap } from '$lib/api'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from '$lib/types/APIError'
import type { Actions } from './$types'

export const actions: Actions = {
    login: wrap(async ({ request, api }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        try {
            await api.post('/api/auth/signin', {
                email,
                password,
            })
        } catch (error: unknown) {
            if (error instanceof APIError) {
                if (error.status === 401) {
                    return fail(401, {
                        error: true,
                        message: error.message,
                    })
                }
            }
        }

        throw redirect(301, '/dashboard')
    }),
}
