import { fail } from '@sveltejs/kit'
import { actionWrapper as wrap } from '$lib/api'

import { type Answer, schema } from '$lib/types/api/Answer'
import { APIError } from '$lib/types/APIError'

import { formatData } from '$lib/util'

import type { Actions } from './$types'

export const actions: Actions = {
    submitAnswer: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = formatData(formData, schema)

        data.assignmentId = params.assignmentId!

        const result = schema.safeParse(data)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: data,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Answer>(`/api/answers`, result.data)
        } catch (error: unknown) {
            console.log('🚀 ~ file: +page.server.ts:40 ~ submitAnswer:wrap ~ error', error)
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
