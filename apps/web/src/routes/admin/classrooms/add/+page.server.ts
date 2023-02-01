import { fail, redirect } from '@sveltejs/kit'
import { actionWrapper as wrap } from '$lib/api'

import { type Classroom, schema } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'

import type { Actions } from './$types'
import { formatData } from '$lib/util'

export const actions: Actions = {
    default: wrap(async ({ request, api, url }) => {
        const formData = await request.formData()
        const data = formatData(formData, schema)

        const result = schema.safeParse(data)

        if (!result.success) {
            return fail(401, {
                error: true,
                data,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Classroom>('/api/classrooms', result.data)

            throw redirect(302, `/admin/classrooms/${response.id}/edit`)
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    errored: true,
                    error: error.message,
                    data: data,
                })
            }
        }
    }),
}
