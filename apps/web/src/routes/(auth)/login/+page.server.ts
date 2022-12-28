import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    login: async ({ request, fetch }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const json = await response.json()

        if (json.status === 401) {
            return fail(401, {
                error: true,
                message: json.message,
            })
        } else {
            throw redirect(301, '/dashboard')
        }

        return json
    },
}
