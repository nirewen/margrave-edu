import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Lesson } from '$lib/types/api/Lesson'

const schema = z.object({
    title: z.string(),
    description: z.string(),
    timespan: z.string(),
    date: z.string(),
    tags: z
        .string()
        .optional()
        .transform(tags => (tags ? tags.split(',') : [])),
    subjectId: z.string().uuid(),
    classId: z.string().uuid(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)
        console.log('🚀 ~ file: +page.server.ts:30 ~ default:wrap ~ result', result)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Lesson>(`/api/lessons`, result.data)

            throw redirect(302, `/teacher/lessons/${response.id}/edit`)
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
