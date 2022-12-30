import { actionWrapper } from '$lib/api'
import { fail, redirect } from '@sveltejs/kit'
import type { APIError } from '$lib/types/APIError'
import type { Actions } from './$types'

export const actions: Actions = {
    login: actionWrapper(async ({ request, api }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        const json = await api.post<APIError>('/api/auth/signup', {
            email,
            password,
        })

        if (json.status === 400) {
            return fail(400, {
                error: true,
                message: json.message,
            })
        } else {
            throw redirect(301, '/dashboard')
        }
    }),
}
