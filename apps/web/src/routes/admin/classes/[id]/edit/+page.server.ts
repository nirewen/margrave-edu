import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

const schema = z.object({
    number: z.string(),
    period: z.string().regex(/^\d{4}\/\d$/, 'período deve seguir o padrão ano/frac'),
    shift: z.enum(['MORNING', 'AFTERNOON', 'NIGHT']),
    classroomId: z.string().uuid(),
    classSubjects: z
        .array(
            z.object({
                classId: z.string().uuid(),
                subjectId: z.string().uuid(),
                weekdays: z
                    .array(z.string().optional())
                    .transform(a => Array.from({ length: 7 }, (_, i) => a[i] === 'on')),
            })
        )
        .optional(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
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
            const response = await api.patch<Classroom>(`/api/classes/${params.id}`, result.data)

            throw redirect(302, `/admin/classes`)
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
