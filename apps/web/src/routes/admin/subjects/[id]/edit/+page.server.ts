import { fail, redirect } from '@sveltejs/kit'
import { actionWrapper as wrap } from '$lib/api'

import { type Subject, schema } from '$lib/types/api/Subject'
import { APIError } from '$lib/types/APIError'

import { formatData } from '$lib/util'

import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = formatData(formData, schema)

        const result = schema.safeParse(data)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: data,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.patch<Subject>(`/api/subjects/${params.id}`, result.data)

            throw redirect(302, `/admin/subjects`)
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    error: true,
                    message: error.message,
                    data: result.data,
                })
            }

            throw error
        }
    }),
}
