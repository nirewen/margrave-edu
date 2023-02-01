import { fail, redirect } from '@sveltejs/kit'
import { actionWrapper as wrap } from '$lib/api'

import { type User, schema } from '$lib/types/User'
import { APIError } from '$lib/types/APIError'

import { formatData } from '$lib/util'

import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api, url }) => {
        const { role } = Object.fromEntries(url.searchParams)
        const formData = await request.formData()
        const data = formatData(formData, schema)

        const result = schema.safeParse(data)

        if (!result.success) {
            return fail(400, {
                errored: true,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<User>('/api/users', {
                email: data.email,
                password: data.password,
                role,
            })

            throw redirect(301, `/admin/users/${response.id}/edit`)
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    errored: true,
                    error: error.message,
                    data: {
                        email: data.email,
                        password: '',
                        role,
                    },
                })
            }

            throw error
        }
    }),
}
