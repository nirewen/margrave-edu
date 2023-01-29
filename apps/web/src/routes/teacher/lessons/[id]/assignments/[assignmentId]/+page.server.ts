import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import { APIError } from '$lib/types/APIError'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Answer } from '$lib/types/api/Answer'

const schema = z.object({
    content: z.string(),
    final: z
        .string()
        .optional()
        .transform(v => v === 'on'),
    assignmentId: z.string().uuid(),
})

export const actions: Actions = {
    submitAnswer: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        obj.assignmentId = params.assignmentId!

        const result = schema.safeParse(obj)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
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
