import { fail } from '@sveltejs/kit'
import { actionWrapper as wrap } from '$lib/api'

import { APIError } from '$lib/types/APIError'
import { type Lesson, assignmentsSchema as schema } from '$lib/types/api/Lesson'

import { formatData } from '$lib/util'

import type { Actions } from './$types'

export const actions: Actions = {
    saveAttendances: wrap(async ({ request, api, params }) => {
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
            const response = await api.patch<Lesson>(`/api/lessons/${params.id}`, result.data)
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
