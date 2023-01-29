import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import { APIError } from '$lib/types/APIError'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Lesson } from '$lib/types/api/Lesson'

const schema = z.object({
    attendances: z
        .record(z.string(), z.string())
        .optional()
        .transform(obj => (obj ? Object.keys(obj).map(id => ({ id })) : [])),
})

export const actions: Actions = {
    saveAttendances: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
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
