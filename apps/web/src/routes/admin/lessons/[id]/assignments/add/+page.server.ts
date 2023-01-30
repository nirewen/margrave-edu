import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Assignment } from '$lib/types/api/Assignment'

const schema = z.object({
    description: z.string(),
    expiresAt: z.string(),
    lessonId: z.string().uuid(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        obj.lessonId = params.id!

        const result = schema.safeParse(obj)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Assignment>(`/api/assignments`, result.data)

            throw redirect(302, `/teacher/lessons/${params.id}/assignments/${response.id}/edit/`)
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
